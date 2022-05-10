import { Injectable, NgZone } from "@angular/core";
import { BleClient, BleDevice } from "@capacitor-community/bluetooth-le";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { defer, delay, filter, from, map, of, Subject, switchMap, take, tap } from "rxjs";
import { HRValue } from '../../models/hr-value.model';
import { ActivitySessionActions, DeviceActions } from "../app.actions";
import { BluetoothConfigSelectors, DeviceSelectors } from "../app.selectors";

@Injectable()
export class DeviceEffect {
    private HEART_RATE_SERVICE = '0000180d-0000-1000-8000-00805f9b34fb';
    private HEART_RATE_MEASUREMENT_CHARACTERISTIC = '00002a37-0000-1000-8000-00805f9b34fb';

    private deviceId: string | null = null;
    private values$ = new Subject<number>();

    deviceId$ = defer(() => this.deviceId ? of(this.deviceId) : this.store.select(BluetoothConfigSelectors.getDeviceId));

    // connection request
    connect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeviceActions.connect),
            switchMap(() => this.deviceId$.pipe(take(1))),
            switchMap(id => defer(() => this.connectAsync(id))),
            map(({ success, error, deviceId }) => success && deviceId ? DeviceActions.connected({ deviceId }) : DeviceActions.connectionError({ error: error! }))
        )
    );

    // data stream - emit actions when new data comes from BLE
    data$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeviceActions.connected),
            switchMap(() =>
                this.values$.pipe(
                    map(value => DeviceActions.dataReceived({ value }))
                )
            )
        )
    );

    // disconnection request
    disconnect$ = createEffect(() => 
        this.actions$.pipe(
            ofType(DeviceActions.disconnect),
            tap(() => this.disconnect()), // detach from BLE
            map(() => DeviceActions.disconnected())
        )
    )

    // disconnected event - if it should be connected, start connection action again
    disconnected$ = createEffect(() => 
        this.actions$.pipe(
            ofType(DeviceActions.disconnected),
            delay(2000),
            switchMap(() => this.store.select(DeviceSelectors.shouldBeConnected).pipe(take(1))),
            filter(v => v),
            map(() => DeviceActions.connect()),
        ),
        { dispatch: false }
    )

    error$ = createEffect(() => 
        this.actions$.pipe(
            ofType(DeviceActions.connectionError),
            delay(2000),
            switchMap(() => this.store.select(DeviceSelectors.shouldBeConnected).pipe(take(1))),
            filter(v => v),
            map(() => DeviceActions.connect()),
        )
    )



    constructor(
        private actions$: Actions,
        private store: Store,
        private ngZone: NgZone
    ) { }

    startRecording() {
        if (!this.deviceId)
            return;
        BleClient.startNotifications(
            this.deviceId,
            this.HEART_RATE_SERVICE,
            this.HEART_RATE_MEASUREMENT_CHARACTERISTIC,
            value => this.onDataReceived(value))
    }

    stopRecording() {
        if (!this.deviceId)
            return;
        BleClient.stopNotifications(this.deviceId, this.HEART_RATE_SERVICE, this.HEART_RATE_MEASUREMENT_CHARACTERISTIC);
    }

    private disconnect() {
        if (!this.deviceId)
            return;
        BleClient.disconnect(this.deviceId);
    }
    private async connectAsync(deviceId?: string | null) {
        try {
            await BleClient.initialize();

            let device: BleDevice | null;
            if (deviceId) {
                // using previously connected device
                const devices = await BleClient.getDevices([deviceId]);
                device = devices.find(d => d.deviceId === deviceId) || null;
            } else {
                // must scan for devices
                device = await BleClient.requestDevice({
                    services: [this.HEART_RATE_SERVICE],
                    optionalServices: [this.HEART_RATE_MEASUREMENT_CHARACTERISTIC]
                });
            }

            if (!device)
                return { success: false, error: 'No suitable device found' };


            // finally, connect to the device itself
            await BleClient.connect(device.deviceId, (id) => this.onDeviceDisconnected(device!));
            this.onDeviceConnected(device);

            this.startRecording();

            return { success: true, deviceId: device.deviceId };
        } catch (error) {
            return { success: false, error: error + "" };
        }
    }
    private onDeviceConnected(device: BleDevice) {
        this.deviceId = device.deviceId;
    }
    private onDeviceDisconnected(device: BleDevice) {
        this.deviceId = null;
        this.store.dispatch(DeviceActions.disconnected());
    }
    private onDataReceived(value: DataView) {
        this.ngZone.run(() => {
            const hr = this.parseHeartRate(value);

            this.values$.next(hr);
        })
    }
    private parseHeartRate(value: DataView) {
        const flags = value.getUint8(0);
        const rate16Bits = flags & 0x1;
        let heartRate: number;
        if (rate16Bits > 0) {
            heartRate = value.getUint16(1, true);
        } else {
            heartRate = value.getUint8(1);
        }
        return heartRate;
    }
}
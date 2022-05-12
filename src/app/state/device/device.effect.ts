import { Injectable, NgZone } from "@angular/core";
import { BleClient, BleDevice } from "@capacitor-community/bluetooth-le";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { defer, delay, filter, from, map, of, Subject, switchMap, take, tap, timeout } from "rxjs";
import { switchAdd } from "src/app/lib/switch-add";
import { BluetoothService } from "src/app/services/bluetooth.service";
import { HRValue } from '../../models/hr-value.model';
import { ActivitySessionActions, DeviceActions } from "../app.actions";
import { BluetoothConfigSelectors, DeviceSelectors } from "../app.selectors";

@Injectable()
export class DeviceEffect {
  
    // connection request
    connect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeviceActions.connect),
            switchMap(() => this.store.select(BluetoothConfigSelectors.getDeviceId)),
            switchMap(id => defer(() => this.bt.connectAsync(id))),
            // map(v => [v]),
            switchAdd(() => 
                 // wait for at least one value before continuing
                this.bt.values$.pipe(
                    take(1), 
                    timeout({
                        each: 10000,
                        with: () => of({ success:false,  error:'Value timeout'})
                    }))),
            map(([{ success, error, devId, devName }]) => 
                success && devId ? 
                    DeviceActions.connected({ deviceId: devId, name: devName }) : 
                    DeviceActions.connectionError({ error: error! }))
        )
    );

    // data stream - emit actions when new data comes from BLE
    data$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeviceActions.connected),
            switchMap(() =>
                this.bt.values$.pipe(
                    map(value => DeviceActions.dataReceived({ value }))
                )
            )
        )
    );

    // disconnection request
    disconnect$ = createEffect(() => 
        this.actions$.pipe(
            ofType(DeviceActions.disconnect),
            tap(() => this.bt.disconnect()), // detach from BLE
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
        private bt:BluetoothService
    ) { }

    
}
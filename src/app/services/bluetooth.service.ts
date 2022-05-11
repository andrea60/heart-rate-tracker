import { Injectable, NgZone } from '@angular/core';
import { BleClient, BleDevice } from '@capacitor-community/bluetooth-le';
import { filter, Subject } from 'rxjs';
import { DeviceActions } from '../state/app.actions';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  private HEART_RATE_SERVICE = '0000180d-0000-1000-8000-00805f9b34fb';
  private HEART_RATE_MEASUREMENT_CHARACTERISTIC = '00002a37-0000-1000-8000-00805f9b34fb';

  private deviceId: string | null = null;
  public values$ = new Subject<number>();
  public connection$ = new Subject<boolean>();
  public onConnect$ = this.connection$.pipe(filter(v => v));
  public onDisconnect$ = this.connection$.pipe(filter(v => !v));

  constructor(private ngZone:NgZone) { }

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

  disconnect() {
    if (!this.deviceId)
      return;
    BleClient.disconnect(this.deviceId);
  }
  async connectAsync(deviceId?: string | null) {
    try {
      console.log('Init BLE connection');
      await BleClient.initialize();

      let device: BleDevice | null;
      if (deviceId) {
        // using previously connected device
        console.log('Restoring connection with previous device');
        const devices = await BleClient.getDevices([deviceId]);
        device = devices.find(d => d.deviceId === deviceId) || null;
      } else {
        // must scan for devices
        console.log('Starting device scan');
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
      console.warn('BLE Device connection error: ', error);
      return { success: false, error: error + "" };
    }
  }
  private onDeviceConnected(device: BleDevice) {
    this.deviceId = device.deviceId;
    console.log('Device connected ', device);
  }
  private onDeviceDisconnected(device: BleDevice) {
    this.deviceId = null;
    console.log('Device disconnected');
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

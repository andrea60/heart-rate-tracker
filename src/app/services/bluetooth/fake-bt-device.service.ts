
import { filter, interval, map, Observable, of, share, timer } from "rxjs";
import { BTConnectionResult, IBluetoothService } from "./ibluetooth-service";

export class FakeBTDeviceService implements IBluetoothService {
    private connected: boolean = false;
    constructor(){
        console.log('⚠️⚒️ Using fake BT device service ⚒️⚠️');
    }
    connectAsync(id?: string | null): Promise<BTConnectionResult> {
        this.connected = true;
        return Promise.resolve({ success: true, devId:'-1', devName:'Fake-BT-Device'});
    }
    disconnectAsync(): Promise<void> {
        this.connected = false;
        return Promise.resolve();
    }
    getValueStream(): Observable<number> {
        return interval(1250).pipe(
            filter(() => this.connected),
            map(() => Math.floor(90 + Math.random() * 70)),
            share()
        );
    }

}
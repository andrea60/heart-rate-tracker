import { Observable } from "rxjs";

export interface IBluetoothService {
    connectAsync(id?:string | null): Promise<BTConnectionResult>;
    disconnectAsync(): Promise<void>;
    getValueStream(): Observable<number>;
}

export interface BTConnectionResult {
    success:boolean;
    error?:string;
    devId?:string;
    devName?:string;
}
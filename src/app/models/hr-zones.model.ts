import { environment } from "src/environments/environment";

export interface HRZoneData<T> {
    [key:number]: T;
    '0': T,
    '1': T,
    '2': T,
    '3': T,
    '4': T
}

export type HRZone = 0 | 1 | 2 | 3 | 4;

function isCallable<P,T>(value:any): value is (args:P) => T {
    if (typeof value === 'function')
        return true;
    return false;
}

export function generateHRZoneData<T>(value:T | ((z:HRZone) => T)){
    const data:Partial<HRZoneData<T>> = {};
    for(let i=0;i<5;i++)
        if (isCallable<HRZone, T>(value))
            data[i] = value(i as HRZone); // safe cast
        else 
            data[i] = { ... value };

    return data as HRZoneData<T>;
}

/** Return default HRZone data in percentage */
export function getDefaultHRZones(): HRZoneData<{ percFrom:number, percTo:number }>{
    return environment.zonesConfig;
}
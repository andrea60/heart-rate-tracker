export interface HRZoneData<T> {
    [key:number]: T;
    '0': T,
    '1': T,
    '2': T,
    '3': T,
    '4': T
}

export type HRZone = 0 | 1 | 2 | 3 | 4;

export function generateHRZoneData<T>(value:T){
    const data:Partial<HRZoneData<T>> = {};
    for(let i=0;i<5;i++)
        data[i] = { ... value };

    return data as HRZoneData<T>;
}
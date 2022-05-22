import { getDefaultHRZones, HRZoneData } from "../models/hr-zones.model";

export function getHRZonesBpm(hrMax:number) {
    const zones = getDefaultHRZones();   

    let result:Partial<HRZoneData<ComputedHRZone>> = {};
    for (let z in zones)
        result[z] = {
            ...zones[z],
            bpmFrom: Math.round(zones[z].percFrom * hrMax / 100),
            bpmTo: Math.round(zones[z].percTo * hrMax / 100)
        }
    return result as HRZoneData<ComputedHRZone>;
}

export interface ComputedHRZone { 
    percFrom: number, 
    percTo:number, 
    bpmFrom:number, 
    bpmTo:number
}
import { getDefaultHRZones, HRZone, HRZoneData } from "../models/hr-zones.model";

export function getHRZone(hrPerc:number) : HRZone {
    const zones = getDefaultHRZones();
    for(let z in zones)
        if (hrPerc >= zones[z].percFrom && hrPerc <= zones[z].percTo)
            return parseInt(z) as HRZone;

    return 0; // default to 'rest'
}
import { HRZoneData, generateHRZoneData } from "../models/hr-zones.model";

export function recomputeZones(zones:HRZoneData<{ totalTime: number }>) {
    let result:HRZoneData<{ totalTime: number, perc: number }> = generateHRZoneData({ totalTime:0, perc: 0});
    let totalTime = 0;
    for(let z in zones)
        totalTime += zones[z].totalTime;
    for(let z in zones)
        result[z] = {
            totalTime: zones[z].totalTime,
            perc: zones[z].totalTime / totalTime * 100
        }
    return result;
}
import { HRZone } from "./hr-zones.model";

export interface HRValue {
    offset:number;
    bpm: number;
    perc: number;
    zone: HRZone;
}
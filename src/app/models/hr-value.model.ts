import { HRZone } from "./hr-zone-data.model";

export interface HRValue {
    offset:number;
    bpm: number;
    perc: number;
    zone: HRZone;
}
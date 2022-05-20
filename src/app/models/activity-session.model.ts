import { HRValue } from "./hr-value.model";
import { HRZoneData } from "./hr-zones.model";

export interface ActivitySession {
    id:string;
    start:Date;
    end?:Date;
    hrValues:HRValue[];   
    hr: HRValue | null;
    zones: HRZoneData<{
        perc: number,
        totalTime: number
    }>
}
import { HRValue } from "./hr-value.model";
import { HRZoneData } from "./hr-zones.model";

export interface ActivitySession {
    id:string;
    start:Date;
    end?:Date;
    hrValues:HRValue[];   
    /** Current HR Value */
    hr: HRValue | null;
    /** Total calories burned (precomputed for performance reason) */
    kcal: number;
    /** Average BPM */
    avgBpm: number;
    /** Average max-hr percentage */
    avgPerc: number;
    /** HR Zones distribution */
    zones: HRZoneData<{
        perc: number,
        totalTime: number
    }>
}
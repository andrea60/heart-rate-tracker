import { HRZoneData } from "./hr-zones.model";

export type HRZonesConfig = HRZoneData<{
    color: string,
    percFrom: number,
    percTo: number,
    label: string
}>;
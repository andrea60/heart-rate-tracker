import { HRValue } from "./hr-value.model";

export interface ActivitySession {
    id:string;
    start:Date;
    end?:Date;
    hrValues:HRValue[];   
    hr: HRValue | null;
}
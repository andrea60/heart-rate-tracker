export interface UserParams {
    hrMax:number;
    birthDate: Date;
    weight:number;
    sex:'M' | 'F';

}
export interface HRZoneConfig {
    percFrom: number;
    percTo: number;
}

export interface HRZoneValue {
    hrMin: number;
    hrMax: number;
}

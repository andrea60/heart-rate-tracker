import { avg } from "../lib/array/avg";
import { getAge } from "../lib/get-age";
import { ActivitySession } from "../models/activity-session.model";
import { UserParams } from "../models/user-params.model";
import getSessionDuration from "./session/get-session-duration";

/** Computes the calories burned during an activity having the parameters specified */
/** @param duration Duration of activity in minutes */
/** @param avgHr Average HR frequency in BPM */
/** @param sex Sex */
/** @param weight Athlete's weight in KG */
/** @param age Athlete's age in years */
export function computeCaloriesBurned(duration:number, avgHr:number, sex:'M' | 'F', weight:number, age:number) {
    if (sex === 'F')
        return Math.round(duration * (0.4472*avgHr - 0.1263*weight + 0.074*age - 20.4022) / 4.184);
    else
        return Math.round(duration * (0.6309*avgHr + 0.1988*weight + 0.2017*age - 55.0969) / 4.184);
}

/** Computes the calories burned during an activity session */
export function computeCaloriesOfSession(session:ActivitySession, userParams:UserParams) {
    const duration = getSessionDuration(session) / 60;
   
    const age = getAge(userParams.birthDate);
    return computeCaloriesBurned(duration, session.avgPerc, userParams.sex, userParams.weight, age);
}
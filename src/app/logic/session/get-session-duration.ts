import { ActivitySession } from "src/app/models/activity-session.model";

/** Computes the duration of a session in seconds */
export default function getSessionDuration(session:ActivitySession){
    const end = session.end ?? new Date();
    return Math.floor((end.valueOf() -session.start.valueOf()) / 1000);
}
import { createReducer, on } from "@ngrx/store";
import { ActivitySession } from "src/app/models/activity-session.model";
import { saveSession } from "./archive.actions";

export interface ArchiveState {
    sessions: { [key:string]: ActivitySession };
}

const initialState:ArchiveState = {
    sessions: {}
}

export default createReducer(
    initialState,
    on(saveSession, (state, {session}) => ({
        ...state,
        sessions: {
            ...state.sessions,
            [session.id]: session
        }
    }))
)
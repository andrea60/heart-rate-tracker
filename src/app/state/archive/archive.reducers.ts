import { createReducer, on } from "@ngrx/store";
import produce from "immer";
import { ActivitySession } from "src/app/models/activity-session.model";
import { deleteSession, saveSession } from "./archive.actions";

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
    })),
    on(deleteSession, (state, {uuid}) => produce(state, (draft) => {
        if (draft.sessions[uuid])
            delete draft.sessions[uuid];
    }))
)
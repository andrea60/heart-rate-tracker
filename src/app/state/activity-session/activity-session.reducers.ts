import { createReducer, on } from "@ngrx/store";
import { getUUID } from "src/app/lib/get-uuid";
import { ActivitySession } from "src/app/models/activity-session.model";
import { addHRData, closeSession, pauseSession, prepareSession, startSession } from "./activity-session.actions";

export type SessionStatus = 'idle' | 'preparing' | 'running' | 'paused';

export interface ActivitySessionState {
    currentSession: ActivitySession | null;
    status: SessionStatus;
    deviceId: string | null;
    deviceError: string | null;    
}

const initialState:ActivitySessionState = {
    currentSession: null,
    status: 'idle',
    deviceId: null,
    deviceError: null
};

function createDefaultSession(): ActivitySession{
    return {
        id: getUUID(),
        hrValues: [],
        start: new Date(),
        hr: null
    }
}

export default createReducer(
    initialState,
    on(prepareSession, (state) => ({ ...state, status: 'preparing' })),
    on(startSession, (state) => ({...state, status:'running', currentSession: createDefaultSession() })),
    on(pauseSession, (state) => ({...state, status:'paused' })),
    on(closeSession, (state) => {
        // check there is an open session now
        if (!state.currentSession)
            return state;
        return { ...state, currentSession: { ...state.currentSession, end: new Date() }};
    }),
    on(addHRData, (state, { value }) => {
        // check there is an open session now
        if (!state.currentSession || state.status != 'running')
            return state;
        return { ...state, currentSession: { ...state.currentSession, hr: value,  hrValues: [...state.currentSession.hrValues, value ]}};
    }),

)
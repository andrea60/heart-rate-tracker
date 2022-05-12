import { createReducer, on } from "@ngrx/store";
import { getUUID } from "src/app/lib/get-uuid";
import { ActivitySession } from "src/app/models/activity-session.model";
import { addHRData, closeSession, pauseSession, prepareSession, startSession } from "./activity-session.actions";
import produce from "immer";
export type SessionStatus = 'idle' | 'preparing' | 'running' | 'paused';

export interface ActivitySessionState {
    currentSession: ActivitySession | null;
    status: SessionStatus;    
}

const initialState:ActivitySessionState = {
    currentSession: null,
    status: 'idle'
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
    on(addHRData, (state, { value, time }) => produce(state, draft => {
        // check there is an open session now
        if (!draft.currentSession || state.status != 'running')
            return;
        const offset = time.valueOf() - draft.currentSession.start.valueOf();
        const hrValue = { offset, value };

        draft.currentSession?.hrValues.push(hrValue);
        draft.currentSession.hr = hrValue;
    })),

)


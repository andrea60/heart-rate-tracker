import { createReducer, on } from "@ngrx/store";
import { getUUID } from "src/app/lib/get-uuid";
import { ActivitySession } from "src/app/models/activity-session.model";
import { addHRData, closeSession, pauseSession, prepareSession, startSession } from "./activity-session.actions";
import produce, { current } from "immer";
import { generateHRZoneData, HRZone, HRZoneData } from "src/app/models/hr-zones.model";
import { HRValue } from "src/app/models/hr-value.model";
import { getHRZone } from "src/app/logic/get-hr-zone";
import { recomputeZones } from "src/app/logic/recompute-zones";
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
        hr: null,
        zones: generateHRZoneData({ perc: 0, totalTime: 0 })
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
    on(addHRData, (state, { value, time, userParams }) => produce(state, draft => {
        // check there is an open session now
        if (!draft.currentSession || state.status != 'running')
            return;

        const { currentSession } = draft;

        const offset = time.valueOf() - currentSession.start.valueOf();
        const perc = value / userParams.hrMax * 100;
        const hrValue:HRValue = { 
            offset, 
            bpm: value, 
            perc,
            zone: getHRZone(perc)
        };

        // compute delta from last value to calc hr-zones distribution
        if (currentSession.hr) {
            const delta = offset - currentSession.hr?.offset;

            currentSession.zones[hrValue.zone].totalTime += delta;

            // recompute the zones distribution
            currentSession.zones = recomputeZones(currentSession.zones);
        }
        currentSession?.hrValues.push(hrValue);
        currentSession.hr = hrValue;

    
    })),

)


import { createReducer, on } from "@ngrx/store";
import { getUUID } from "src/app/lib/get-uuid";
import { ActivitySession } from "src/app/models/activity-session.model";
import { addHRData, closeSession, pauseSession, prepareSession, resumeSession, startSession } from "./activity-session.actions";
import produce, { current } from "immer";
import { generateHRZoneData, HRZone, HRZoneData } from "src/app/models/hr-zones.model";
import { HRValue } from "src/app/models/hr-value.model";
import { getHRZone } from "src/app/logic/get-hr-zone";
import { recomputeZones } from "src/app/logic/recompute-zones";
import { computeCaloriesOfSession } from "src/app/logic/compute-calories";
import { avg } from "src/app/lib/array/avg";
import { ActivitySessionSettings } from "src/app/models/activity-session-settings.model";
export type SessionStatus = 'idle' | 'preparing' | 'running' | 'paused';

export interface ActivitySessionState {
    currentSession: ActivitySession | null;
    status: SessionStatus;    
    settings?: ActivitySessionSettings;
}

const initialState:ActivitySessionState = {
    currentSession: null,
    status: 'idle'
};

function createDefaultSession(activityTypeId:string): ActivitySession{
    return {
        id: getUUID(),
        activityTypeId,
        hrValues: [],
        start: new Date(),
        hr: null,
        kcal: NaN,
        avgBpm: NaN,
        avgPerc: NaN,
        zones: generateHRZoneData({ perc: 0, totalTime: 0 })
    }
}

export default createReducer(
    initialState,
    on(prepareSession, (state, settings) => ({ ...state, status: 'preparing', settings })),
    on(startSession, (state) => ({
        ...state, 
        status:'running', 
        currentSession: createDefaultSession(state.settings!.activityTypeId) 
    })),
    on(pauseSession, (state) => ({...state, status:'paused' })),
    on(resumeSession, (state) => ({...state, status:'running'})),
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

        const { currentSession: cur } = draft;

        const offset = time.valueOf() - cur.start.valueOf();
        const perc = value / userParams.hrMax * 100;
        const hrValue:HRValue = { 
            offset, 
            bpm: value, 
            perc,
            zone: getHRZone(perc)
        };

        // compute delta from last value to calc hr-zones distribution
        if (cur.hr) {
            const delta = offset - cur.hr?.offset;

            cur.zones[hrValue.zone].totalTime += delta;

            // recompute the zones distribution
            cur.zones = recomputeZones(cur.zones);
        }
        cur?.hrValues.push(hrValue);
        cur.hr = hrValue;


        // computes heavy values
        cur.kcal = computeCaloriesOfSession(cur, userParams);
        cur.avgBpm = avg(cur.hrValues, v => v.bpm);
        cur.avgPerc = avg(cur.hrValues, v => v.perc);
    })),

)


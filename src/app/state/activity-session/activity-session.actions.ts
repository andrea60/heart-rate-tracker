import { createAction, props } from "@ngrx/store";
import { HRValue } from "src/app/models/hr-value.model";
import { UserParams } from "src/app/models/user-params.model";

export const prepareSession = createAction('[Activity Session] Starting new session');
export const startSession = createAction('[Activity Session] Session started');
export const pauseSession = createAction('[Activity Session] Pause Session');
export const closeSession = createAction('[Activity Session] Close current session');
export const addHRData = createAction('[Activity Session] Register HR Value', props<{ value: number, time:Date, userParams:UserParams }>());
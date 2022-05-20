import { createAction, props } from "@ngrx/store";
import { ActivitySession } from "src/app/models/activity-session.model";

export const saveSession = createAction('[Archive] Save session', props<{ session: ActivitySession }>());
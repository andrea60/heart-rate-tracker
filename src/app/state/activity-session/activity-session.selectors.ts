import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ActivitySessionState } from "./activity-session.reducers";

const _= createFeatureSelector<ActivitySessionState>('activitySession');

export const getCurrentSession = createSelector(_, state => state.currentSession);
export const hasActiveSession = createSelector(_, state => state.currentSession != null);
export const getSessionSettings = createSelector(_, state => state.settings);
export const getStatus = createSelector(_, state => state.status);
export const getCurrentHR = createSelector(_, state => state.currentSession?.hr || null);
export const getZones = createSelector(_, state => state.currentSession?.zones || null);
export const getTypes = createSelector(_, state => state.activityTypes);

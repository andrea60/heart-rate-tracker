import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ActivitySessionState } from "./activity-session.reducers";

const _= createFeatureSelector<ActivitySessionState>('activity-session');

export const getCurrentSession = createSelector(_, state => state.currentSession);
export const hasActiveSession = createSelector(_, state => state.currentSession != null);
export const getStatus = createSelector(_, state => state.status);
export const getCurrentHR = createSelector(_, state => state.currentSession?.hr || null);
export const getZones = createSelector(_, state => state.currentSession?.zones || null);

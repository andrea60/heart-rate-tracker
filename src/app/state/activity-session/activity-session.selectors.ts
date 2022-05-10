import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ActivitySessionState } from "./activity-session.reducers";

const activitySession = createFeatureSelector<ActivitySessionState>('activity-session');

export const getCurrentSession = createSelector(activitySession, state => state.currentSession);
export const hasActiveSession = createSelector(activitySession, state => state.currentSession != null);
export const getStatus = createSelector(activitySession, state => state.status);
export const getDeviceInfo = createSelector(activitySession, ({ deviceError, deviceId }) => ({ deviceId, deviceError}));
export const getCurrentHR = createSelector(activitySession, state => state.currentSession?.hr);

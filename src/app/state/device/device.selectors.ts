import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DeviceState } from "./device.reducers";

const device = createFeatureSelector<DeviceState>('device');

export const isConnected = createSelector(device, s => s.status === 'connected');
export const getStatus = createSelector(device, s => s.status);
export const error = createSelector(device, s => s.error);
export const currentId = createSelector(device, s => s.currentDevId);
export const currentName = createSelector(device, s => s.currentDevName);
export const currentDev = createSelector(device, s => ({ name: s.currentDevName, id: s.currentDevId }));
export const shouldBeConnected = createSelector(device, s => s.shouldBeConnected);
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DeviceState } from "./device.reducers";

const device = createFeatureSelector<DeviceState>('device');

export const isConnected = createSelector(device, s => s.connected);
export const error = createSelector(device, s => s.error);
export const currentId = createSelector(device, s => s.currentDeviceId);
export const shouldBeConnected = createSelector(device, s => s.shouldBeConnected);
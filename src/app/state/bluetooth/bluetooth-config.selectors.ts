import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BluetoothConfig } from "./bluetooth-config.reducers";

const bluetooth = createFeatureSelector<BluetoothConfig>('bluetooth');

export const getConfig = createSelector(bluetooth, state => state);
export const getDeviceId = createSelector(bluetooth, state => state.deviceId);
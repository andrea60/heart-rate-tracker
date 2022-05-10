import { createAction, props } from "@ngrx/store";

export const setDeviceId = createAction('[Bluetooth] Set Device ID', props<{ deviceId: string }>());

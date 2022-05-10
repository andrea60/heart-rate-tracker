import { createAction, props } from "@ngrx/store";


export const connect = createAction('[Device] Start Connection');
export const connected = createAction('[Device] Device Connected', props<{ deviceId: string }>());
export const disconnect = createAction('[Device] Disconnect from Device');
export const disconnected = createAction('[Device] Device Disconnected');
export const connectionError = createAction('[Device] Connection Error', props<{ error: string | null }>());
export const dataReceived = createAction('[Device] Data received', props<{ value:number }>());
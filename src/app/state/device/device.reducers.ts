import { createReducer, on } from "@ngrx/store";
import { connect, connected, connectionError, disconnect, disconnected } from "./device.actions";

export interface DeviceState {
    currentDeviceId: string | null;
    connected: boolean;
    shouldBeConnected: boolean;
    error: string | null;
}

const initialState:DeviceState = {
    currentDeviceId: null,
    connected: false,
    error: null,
    shouldBeConnected: false
}


export default createReducer(
    initialState,

    on(connected, (state, {deviceId}) => ({...state, error:null, connected:true, shouldBeConnected: true, currentDeviceId: deviceId })),

    on(disconnect, (state) => ({...state, shouldBeConnected: false })),

    on(disconnected, (state) => ({...state, connected:false, currentDeviceId: null, error:null})),

    on(connectionError, (state, { error }) => ({...state, error, connected: false }))
)
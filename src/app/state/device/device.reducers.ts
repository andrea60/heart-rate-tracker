import { createReducer, on } from "@ngrx/store";
import produce from "immer";
import { connect, connected, connectionError, dataReceived, disconnect, disconnected } from "./device.actions";

export type DeviceStatus = 'disconnected' | 'connecting' | 'connected';
export interface DeviceState {
    currentDevId: string | null;
    currentDevName: string | null;
    status: DeviceStatus;
    shouldBeConnected: boolean;
    error: string | null;
}

const initialState:DeviceState = {
    currentDevId: null,
    currentDevName: null,
    status: 'disconnected',
    error: null,
    shouldBeConnected: false
}


export default createReducer(
    initialState,

    on(connect, (state) => ({ ...state, status:'connecting' })),
    on(connected, (state, {deviceId, name}) => ({ 
        ...state, 
        error:null, 
        shouldBeConnected: true, 
        currentDevId: deviceId,
        currentDevName: name || null,
        status:'connected'
    })),

    on(disconnect, (state) => ({...state, shouldBeConnected: false })),

    on(disconnected, (state) => ({...state, status:'disconnected', currentDeviceId: null, error:null})),

    on(connectionError, (state, { error }) => ({...state, error, status:'disconnected' })),

)
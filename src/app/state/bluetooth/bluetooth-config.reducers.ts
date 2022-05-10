import { createReducer, on } from "@ngrx/store";
import { setDeviceId } from "./bluetooth-config.actions";


export interface BluetoothConfig {
    deviceId:string | null;
}

const initialState:BluetoothConfig = {
    deviceId: null
}

export default createReducer(
    initialState,
    on(setDeviceId, (state, { deviceId }) => ({...state, deviceId})),
)
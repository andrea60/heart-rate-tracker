import { UserParams } from "../models/user-params.model";
import { ActivitySessionState } from "./activity-session/activity-session.reducers";
import { ArchiveState } from "./archive/archive.reducers";
import { BluetoothConfig } from "./bluetooth/bluetooth-config.reducers";
import { DeviceState } from "./device/device.reducers";
import { UserState } from "./user/user.reducers";

export interface AppState {
    user: UserState,
    userParams: UserParams,
    activitySession: ActivitySessionState,
    bluetooth: BluetoothConfig,
    device: DeviceState,
    archive: ArchiveState

}


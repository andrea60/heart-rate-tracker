import { createReducer } from "@ngrx/store";
import { User } from "src/app/models/user";

export const TAG = 'USER';

export interface UserState {
    currentUser?:User;
    loginTime?:Date;
}

const initialState:UserState = { }

const reducers = createReducer(
    initialState
)
import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/user";
import { loginFailed, loginRequest, loginSuccess } from "./user.actions";


export const TAG = 'user';

export interface UserState {
    currentUser?:User;
    loading: boolean;
    error: boolean;
    loginTime?:Date;
}

const initialState:UserState = { loading: false, error:false }

export default createReducer(
    initialState,
    
    on(loginRequest, (state) => ({ ...state, loading: true, error:false })),

    on(loginFailed, (state) => ({...state, loading:false, error:true})),

    on(loginSuccess, (state, user) => { 
        return {...state, loading: false, error: false, currentUser: user }; 
    })
)
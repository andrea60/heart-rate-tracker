import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user";
import { TAG } from "./user.reducers";

export const loginRequest = createAction(`[User] Login Request` , props<{ email:string, password:string }>());
export const loginFailed = createAction('[User] Login Failed');
export const loginSuccess = createAction('[User] Login Success', props<User>());

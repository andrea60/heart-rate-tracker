import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user";
import { TAG } from "./user.reducers";

export const userLogin = createAction(`[${TAG}] Login` , props<User>());

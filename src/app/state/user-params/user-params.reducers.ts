import { createReducer, on } from "@ngrx/store";

import { UserParams } from "src/app/models/user-params.model";
import { setHrMax } from "./user-params.actions";

const initialState:UserParams = {
    hrMax: 197,
    birthDate: new Date(1996,7,13),
    sex:'M',
    weight: 64
};

export default createReducer(
    initialState,
    on(setHrMax, (state, { hrMax }) => ({...state, hrMax }))
)
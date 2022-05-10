import { createAction, props } from "@ngrx/store";

export const setHrMax = createAction('[User Params] Set HR Max', props<{ hrMax:number }>());
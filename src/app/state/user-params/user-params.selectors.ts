import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserParams } from "src/app/models/user-params.model";

const userParams = createFeatureSelector<UserParams>('userParams');

export const getHRMax = createSelector(userParams, state => state.hrMax);
export const getAll = createSelector(userParams, s => s);
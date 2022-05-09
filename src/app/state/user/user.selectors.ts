import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TAG, UserState } from './user.reducers';

const userSelector = createFeatureSelector<UserState>(TAG);

export const getCurrentUser = createSelector(userSelector, (state) => state.currentUser);
export const getLoginTime = createSelector(userSelector, (state) => state.loginTime);
export const isLoading = createSelector(userSelector, state => state.loading);
export const hasError = createSelector(userSelector, state => state.error);
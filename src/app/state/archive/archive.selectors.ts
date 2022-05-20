import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ArchiveState } from "./archive.reducers";

export const archive = createFeatureSelector<ArchiveState>('archive');

export const getSession = (id:string) => createSelector(archive, (state) => id in state.sessions ? state.sessions[id] : null);
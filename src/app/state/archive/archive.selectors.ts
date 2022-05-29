import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ArchiveState } from "./archive.reducers";

const archive = createFeatureSelector<ArchiveState>('archive');

export const getSession = (id:string) => createSelector(archive, (state) => id in state.sessions ? state.sessions[id] : null);
export const getAll = createSelector(archive, state => Object.keys(state.sessions).map(k => state.sessions[k]));
export const getPaged = (offset:number, count:number) => createSelector(archive, getAll, (_, sessions) => sessions.slice(offset, offset + count))
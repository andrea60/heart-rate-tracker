import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionCreator, Creator, Store } from '@ngrx/store';
import { filter, map, switchMap, take } from 'rxjs';
import { filterTrue, whenTrue } from 'src/app/lib/filter-true';
import { joinState } from 'src/app/lib/join-state';
import { switchAdd } from 'src/app/lib/switch-add';

import { ActivitySessionActions, DeviceActions } from '../app.actions';
import { ActivitySessionSelectors, UserParamsSelectors } from '../app.selectors';

@Injectable()
export class ActivitySessionEffects {

  // when a new session is about to start, connect to the device
  prepareSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivitySessionActions.prepareSession),
      map(() => DeviceActions.connect())
    )
  );

  // when device is connected and session is starting, actually start it
  startSession$ = createEffect(() => 
      this.actions$.pipe(
        ofType(DeviceActions.connected),
        joinState(() => this.store.select(ActivitySessionSelectors.getStatus)),
        filter(([_,status]) => status == 'preparing'),
        map(() => ActivitySessionActions.startSession()),
      )
  );

  logData$ = createEffect(() => 
        this.actions$.pipe(
          ofType(DeviceActions.dataReceived),
          joinState(() => this.store.select(ActivitySessionSelectors.hasActiveSession)),
          filter(([_, active]) => active === true),
          joinState(() => this.store.select(UserParamsSelectors.getAll)),
          map(([[{ value }], userParams]) => ActivitySessionActions.addHRData({ value, time:new Date(), userParams }))
        )
  )
  constructor(private store: Store, private actions$: Actions) {

  }
}

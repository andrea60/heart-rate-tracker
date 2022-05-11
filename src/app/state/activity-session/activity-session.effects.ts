import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap } from 'rxjs';
import { filterTrue, whenTrue } from 'src/app/lib/filter-true';
import { switchAdd } from 'src/app/lib/switch-add';

import { ActivitySessionActions, DeviceActions } from '../app.actions';
import { ActivitySessionSelectors } from '../app.selectors';

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
        switchMap(() => this.store.select(ActivitySessionSelectors.getStatus)),
        filter(status => status == 'preparing'),
        map(() => ActivitySessionActions.startSession()),
      )
  );

  logData$ = createEffect(() => 
        this.actions$.pipe(
          ofType(DeviceActions.dataReceived),
          switchAdd(() => this.store.select(ActivitySessionSelectors.hasActiveSession)),
          map(([{value}, b]) => )
          
        )
  )



  constructor(private store: Store, private actions$: Actions) {

  }




}

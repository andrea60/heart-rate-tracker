import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { ActivitySessionActions, DeviceActions } from '../app.actions';

@Injectable()
export class ActivitySessionEffects {

  // when a new session is about to start, connect to the device
  prepareSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivitySessionActions.prepareSession),
      map(() => DeviceActions.connect())
    )
  );



  constructor(private store: Store, private actions$: Actions) {

  }




}

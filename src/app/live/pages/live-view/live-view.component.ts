import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivitySessionEffects } from 'src/app/state/activity-session/activity-session.effects';
import { ActivitySessionState } from 'src/app/state/activity-session/activity-session.reducers';
import { ActivitySessionActions } from 'src/app/state/app.actions';
import { ActivitySessionSelectors, DeviceSelectors } from 'src/app/state/app.selectors';

@Component({
  selector: 'hrt-live-view',
  templateUrl: './live-view.component.html',
})
export class LiveViewComponent implements OnInit {

  sessionActive$ = this.store.select(ActivitySessionSelectors.hasActiveSession);
  hr$ = this.store.select(ActivitySessionSelectors.getCurrentHR);
  zones$ = this.store.select(ActivitySessionSelectors.getZones);

  constructor(public store:Store<ActivitySessionState>) { }

  ngOnInit(): void {
  }

  start(){
    this.store.dispatch(ActivitySessionActions.prepareSession());
  }

  stop(){
    this.store.dispatch(ActivitySessionActions.closeSession());
  }

}

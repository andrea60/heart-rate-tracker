import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivitySessionEffects } from 'src/app/state/activity-session/activity-session.effects';
import { ActivitySessionState } from 'src/app/state/activity-session/activity-session.reducers';
import { ActivitySessionActions } from 'src/app/state/app.actions';
import { ActivitySessionSelectors } from 'src/app/state/app.selectors';

@Component({
  selector: 'hrt-live-view',
  templateUrl: './live-view.component.html',
})
export class LiveViewComponent implements OnInit {

  sessionStatus$ = this.store.select(ActivitySessionSelectors.getStatus);
  deviceInfo$ = this.store.select(ActivitySessionSelectors.getDeviceInfo);
  hr$ = this.store.select(ActivitySessionSelectors.getCurrentHR);

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

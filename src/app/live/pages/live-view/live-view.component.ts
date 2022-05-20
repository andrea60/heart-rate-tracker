import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { slideIn } from 'src/app/animations/slide-in.anim';
import { getHRZone } from 'src/app/logic/get-hr-zone';
import { ActivitySessionEffects } from 'src/app/state/activity-session/activity-session.effects';
import { ActivitySessionState } from 'src/app/state/activity-session/activity-session.reducers';
import { ActivitySessionActions } from 'src/app/state/app.actions';
import { ActivitySessionSelectors, DeviceSelectors, UserParamsSelectors } from 'src/app/state/app.selectors';

@Component({
  selector: 'hrt-live-view',
  templateUrl: './live-view.component.html',
  animations:[ trigger('slideIn', [transition(':enter', useAnimation(slideIn))])]
})
export class LiveViewComponent implements OnInit {

  sessionActive$ = this.store.select(ActivitySessionSelectors.hasActiveSession);
  paused$ = this.store.select(ActivitySessionSelectors.getStatus).pipe(map(status => status === 'paused'));
  hr$ = this.store.select(ActivitySessionSelectors.getCurrentHR).pipe(filter(hr => !!hr));
  currentZone$ = this.hr$.pipe(map(hr => getHRZone(hr!.perc)));
  zones$ = this.store.select(ActivitySessionSelectors.getZones);

  userParams$ = this.store.select(UserParamsSelectors.getAll);
  hrMax$ = this.userParams$.pipe(map(p => p.hrMax!));

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

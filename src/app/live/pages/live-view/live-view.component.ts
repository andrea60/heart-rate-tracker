import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, interval, map, startWith, switchMap, timer } from 'rxjs';
import { slideIn } from 'src/app/animations/slide-in.anim';
import { getHRZone } from 'src/app/logic/get-hr-zone';
import getSessionDuration from 'src/app/logic/session/get-session-duration';
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
  session$ = this.store.select(ActivitySessionSelectors.getCurrentSession);
  hrValues$ = this.session$.pipe(map(s => s?.hrValues ?? []));

  // cards information
  duration$ = interval(1000).pipe(
    switchMap(() => this.session$), 
    map(session => session ? getSessionDuration(session) : null));
  calories$ = this.session$.pipe(map(s => s?.kcal ?? NaN));
  avgBpm$ = this.session$.pipe(map(s => s?.avgBpm ?? NaN));
  avgPerc$ = this.session$.pipe(map(s => s?.avgPerc ?? NaN));

  userParams$ = this.store.select(UserParamsSelectors.getAll);
  hrMax$ = this.userParams$.pipe(map(p => p.hrMax!));

  constructor(public store:Store<ActivitySessionState>) { }

  ngOnInit(): void {
  }

  stop(){
    this.store.dispatch(ActivitySessionActions.closeSession());
  }

}

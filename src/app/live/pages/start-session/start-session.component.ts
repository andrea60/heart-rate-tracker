import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { delay, filter, interval, map, startWith, switchMap, take, timer } from 'rxjs';
import { ModalService } from 'src/app/shared/modals/modal.service';
import { ActivitySessionActions } from 'src/app/state/app.actions';
import { ActivitySessionSelectors, DeviceSelectors } from 'src/app/state/app.selectors';

@Component({
  selector: 'hrt-start-session',
  templateUrl: './start-session.component.html',
})
export class StartSessionComponent implements OnInit {

  sessionStatus$ = this.store.select(ActivitySessionSelectors.getStatus);
  deviceStatus$ = this.store.select(DeviceSelectors.getStatus);


  countdown$ = this.sessionStatus$.pipe(
    filter(status => status ===  'running'),
    take(1),
    switchMap(() => interval(1000).pipe(startWith(-1), take(3), map(x => 2 - x)))
  )

  constructor(
    private store:Store, 
    private router:Router,
    private modal: ModalService) { }

  ngOnInit(): void {
    this.countdown$.pipe(delay(1000)).subscribe({
       complete:() => this.router.navigate(['/live'])
    })
  }

  start(){
    this.store.dispatch(ActivitySessionActions.prepareSession());
  }


}

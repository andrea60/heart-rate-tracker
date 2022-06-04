import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { ObservableInputs } from 'src/app/lib/observable-inputs';
import getSessionDuration from 'src/app/logic/session/get-session-duration';
import { ModalService } from 'src/app/modals/modal.service';
import { ActivitySession } from 'src/app/models/activity-session.model';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { ActivitySessionSelectors } from 'src/app/state/app.selectors';
import { SessionDetailsComponent } from '../session-details/session-details.component';

@Component({
  selector: 'hrt-session-entry',
  templateUrl: './session-entry.component.html',
})
export class SessionEntryComponent implements OnInit, OnChanges {
  private inputs = new ObservableInputs();
  private DEFAULT_ICON = 'local_fire_department';
  @Input()
  session!: ActivitySession;
  session$ = this.inputs.observe(() => this.session);

  sessionType$ =combineLatest([this.store.select(ActivitySessionSelectors.getTypes), this.session$]).pipe(
    map(([types, session]) => types.find(t => t.id === session.activityTypeId)?.icon),
    map(icon => icon || this.DEFAULT_ICON)
  );

  duration$ = this.session$.pipe(
    map(s => getSessionDuration(s)),
    map(duration => this.durationPipe.transform(duration, 'tot_mins'))
  );

  constructor(
    private store:Store,
    private modal:ModalService,
    private durationPipe: DurationPipe
  ) { }

  ngOnInit(): void {
    if (!this.session)
      throw 'SessionEntryComponent must have a session input';
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.inputs.onChanges();
  }
  openDetails(){
    this.modal.openModal(SessionDetailsComponent, { type:'card', title: 'Session details', inputs: { id: this.session.id }});
  }
}

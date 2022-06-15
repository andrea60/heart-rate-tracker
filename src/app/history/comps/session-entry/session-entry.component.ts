import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, switchMap } from 'rxjs';
import { ObservableInputs } from 'src/app/lib/observable-inputs';
import getSessionDuration from 'src/app/logic/session/get-session-duration';
import { ModalService } from 'src/app/modals/modal.service';
import { DialogOption } from 'src/app/modals/options-dialog/options-dialog.component';
import { ActivitySession } from 'src/app/models/activity-session.model';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { ActivitySessionSelectors } from 'src/app/state/app.selectors';
import { deleteSession } from 'src/app/state/archive/archive.actions';
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

  sessionType$ = this.session$.pipe(
    switchMap(({activityTypeId}) => this.store.select(ActivitySessionSelectors.getType(activityTypeId)))
  )
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
  openMenu(){
    const options:DialogOption[] = [
      { key:'delete', text:'Delete', icon:'delete_forever', type:'danger'}
    ];

    this.modal.openOptionsDialog(options, true).subscribe(({reason, data}) => {
      if (reason === 'complete' && data.key === 'delete')
        this.deleteEntry();
    })
  }

  deleteEntry(){
    this.store.dispatch(deleteSession({ uuid: this.session.id }))
  }
}

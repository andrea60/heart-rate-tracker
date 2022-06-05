import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs';
import { ObservableInputs } from 'src/app/lib/observable-inputs';
import { ModalContent } from 'src/app/modals/modal-content';
import { ModalService } from 'src/app/modals/modal.service';
import { ActivitySessionSelectors, ArchiveSelectors, UserParamsSelectors } from 'src/app/state/app.selectors';

@Component({
  selector: 'hrt-session-details',
  templateUrl: './session-details.component.html',
})
export class SessionDetailsComponent extends ModalContent implements OnInit, OnChanges {
  private readonly inputs = new ObservableInputs();
  @Input()
  id!:string;
  protected id$ = this.inputs.observe(() => this.id);

  protected session$ = this.id$.pipe(
    switchMap(() => this.store.select(ArchiveSelectors.getSession(this.id))),
    map(s => {
      if (!s)
        throw 'Session not found';
      return s!;
    })
  );

  protected userParams$ = this.store.select(UserParamsSelectors.getAll);
  protected zones$ = this.session$.pipe(map(s => s.zones));
  protected type$ = this.session$.pipe(
    switchMap(session => this.store.select(ActivitySessionSelectors.getType(session.activityTypeId)))
  );

  constructor(
    modal:ModalService,
    private store:Store
  ) {
    super(modal);
  }
  


  ngOnChanges(changes: SimpleChanges): void {
    console.log('Adsasd');
    this.inputs.onChanges();
  }


  ngOnInit(): void {

  }
  override onModalInit(): void {
    if (!this.id)
      console.error('Cannot init SessionDetailsComponent without a session ID!')
    this.inputs.onChanges();
  }

}

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
  id$ = this.inputs.observe(() => this.id);

  constructor(
    modal:ModalService,
    private store:Store
  ) {
    super(modal);
  }
  session$ = this.id$.pipe(
    switchMap(() => this.store.select(ArchiveSelectors.getSession(this.id))),
    tap(s => console.log('Got session ', s))
  );

  userParams$ = this.store.select(UserParamsSelectors.getAll);
  zones$ = this.session$.pipe(map(s => s!.zones));


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

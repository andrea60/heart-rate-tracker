import { Injectable, Type } from '@angular/core';
import { filter, map, merge, Observable, Subject, take } from 'rxjs';
import { getUUID } from 'src/app/lib/get-uuid';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ModalContent } from './modal-content';
import { ModalRenderConf } from './modal-render-conf.model';
import { DialogOption, OptionsDialogComponent } from './options-dialog/options-dialog.component';


type GenericOf<T> = T extends ModalContent<infer X> ? X : never;
export type ModalType = 'dialog' | 'card'
export type ModalOptions<TComp = any> = ModalRenderConf & {
  inputs?:Partial<TComp>;
}

export type ModalChangeEvent = 
  { action:'open', inputs?:any, componentClass:Type<any>, conf:ModalRenderConf} |
  { action:'close', inputs?:never, componentClass?:never, conf?:never}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  out$ = new Subject<ModalChangeEvent>();
  in$ = new Subject<{
    reason: ModalCloseReason,
    data: any
  }>();

  current$ = this.out$.pipe(
    map(({action, conf}) => ({ open: action === 'open', type: conf?.type}))
  )

  hasActiveModal$ = this.current$.pipe(map(d => d.open));
  private defaultConf:ModalRenderConf = {
    backgroundType:'opaque',
    padding: '1rem',
    type:'dialog'
  }

  constructor() { }

  /** Renders and opens a new modal using the component specified as body */
  openModal<TComp extends ModalContent<TRet>,TRet>(comp:Type<TComp>, options?:ModalOptions<TComp>) : Observable<{ reason: ModalCloseReason, data: GenericOf<TComp> }> {

    const config = { ...this.defaultConf, ...options};
    // send open signal
    this.out$.next({ 
      action:'open', 
      componentClass: comp, 
      inputs: options?.inputs, 
      conf: config
    });

    // listen for close signal
    return this.in$.pipe(
        map(payload => ({ 
          reason: payload.reason, 
          data: payload.data as GenericOf<TComp>
        })),
        take(1))
  }

  /** Opens a generic confirmation (yes\no) dialog with a custom text */
  openConfirmDialog(text:string){
    return this.openModal(ConfirmDialogComponent, { inputs: { text }, type:'dialog' });
  }
  /** Opens a dialog with several options */
  openOptionsDialog(options:DialogOption[], allowCancel:boolean=false){
    return this.openModal(OptionsDialogComponent, {
      inputs: { extOptions: options, allowCancel },
      type:'dialog'
    });
  }
  closeModal(){
    this.out$.next({ action:'close'});
  }

  _complete(reason:ModalCloseReason, data:any) {
    this.in$.next({ reason, data });
    this.out$.next({ action:'close'});
  }
}

export type ModalCloseReason = 'cancel' | 'complete'



import { Injectable, Type } from '@angular/core';
import { filter, map, Observable, Subject, take } from 'rxjs';
import { getUUID } from 'src/app/lib/get-uuid';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ModalContent } from './modal-content';


type GenericOf<T> = T extends ModalContent<infer X> ? X : never;


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _id:string = '';
  out$ = new Subject<{
    action:'open' | 'close'
    inputs?:any,
    componentClass?: Type<any>
  }>();
  in$ = new Subject<{
    reason: ModalCloseReason,
    data: any
  }>();

  constructor() { }

  /** Renders and opens a new modal using the component specified as body */
  openModal<TComp extends ModalContent<TRet>,TRet>(comp:Type<TComp>, inputs?:Partial<TComp>) : Observable<{ reason: ModalCloseReason, data: GenericOf<TComp> }> {
   
    this.out$.next({ action:'open', componentClass: comp, inputs });
    return this.in$.pipe(
        map(payload => ({ 
          reason: payload.reason, 
          data: payload.data as GenericOf<TComp>
        })),
        take(1))
  }

  /** Opens a generic confirmation (yes\no) dialog with a custom text */
  openConfirmDialog(text:string){
    return this.openModal(ConfirmDialogComponent, { text });
  }
  closeModal(){
    this.out$.next({ action:'close' });
  }

  _complete(reason:ModalCloseReason, data:any) {
    this.in$.next({ reason, data });
    this.out$.next({ action:'close'});
  }
}

export type ModalCloseReason = 'cancel' | 'complete'



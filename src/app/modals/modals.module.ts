import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalRendererComponent } from './modal-renderer/modal-renderer.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ModalButtonComponent } from './modal-button/modal-button.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';
import { ModalTargetDirective } from './modal-target.directive';



@NgModule({
  declarations: [
    ModalRendererComponent,
    ModalTargetDirective,
    ModalButtonComponent,
    ModalFooterComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    ModalButtonComponent,
    ModalFooterComponent,
    ModalRendererComponent
  ]
})
export class ModalsModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalRendererComponent } from './modal-renderer/modal-renderer.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ModalButtonComponent } from './modal-button/modal-button.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';
import { ModalTargetDirective } from './modal-target.directive';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { OptionsDialogComponent } from './options-dialog/options-dialog.component';



@NgModule({
  declarations: [
    ModalRendererComponent,
    ModalTargetDirective,
    ModalButtonComponent,
    ModalFooterComponent,
    ConfirmDialogComponent,
    ModalHeaderComponent,
    OptionsDialogComponent,
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

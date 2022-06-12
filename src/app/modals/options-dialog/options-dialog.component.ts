import { Component, Input, OnInit } from '@angular/core';
import { ModalContent } from '../modal-content';
import { ModalService } from '../modal.service';

@Component({
  selector: 'hrt-options-dialog',
  templateUrl: './options-dialog.component.html'
})
export class OptionsDialogComponent extends ModalContent<DialogOption> {
  @Input('options')
  extOptions: DialogOption[] = [];

  @Input()
  allowCancel:boolean = true;

  protected options:DialogOption[] = [];

  
  constructor(
    modal:ModalService
  ) { 
    super(modal);
  }

  protected onClick(option:DialogOption){
    if (option.key === '__CANCEL')
      this.cancelModal();
    else
      this.closeModal(option);
  }
  protected getColorClass(option:DialogOption){
    const type = option.type || 'default';
    return type == 'danger' ? 'text-red-500' : '';
  }
  override onModalInit(): void {
      this.options = this.extOptions;
      if (this.allowCancel) {
        const cancelOption = {
          key:'__CANCEL',
          text:'Cancel'
        }
        this.options = [...this.options, cancelOption];
      }
  }

 
}

export interface DialogOption {
  [key:string]:any;
  text:string;
  key:string;
  disabled?:boolean;
  icon?:string;  
  type?: 'default' | 'danger';
}

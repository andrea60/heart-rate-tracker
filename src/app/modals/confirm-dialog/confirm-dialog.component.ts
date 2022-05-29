import { Component, Input, OnInit } from '@angular/core';
import { ModalContent } from '../modal-content';
import { ModalService } from '../modal.service';

@Component({
  selector: 'hrt-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent extends ModalContent<boolean> implements OnInit  {
 
  @Input()
  text!:string;
  b!:boolean;

  constructor(
    modal:ModalService
  ) { 
    super(modal);
  }

  ngOnInit(): void {
  }
  confirm(){
    this.closeModal(true);
  }
  cancel(){
    this.cancelModal();
  }
}

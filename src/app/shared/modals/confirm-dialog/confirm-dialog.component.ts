import { Component, Input, OnInit } from '@angular/core';
import { ModalContent } from '../modal-content';
import { ModalService } from '../modal.service';

@Component({
  selector: 'hrt-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent implements OnInit, ModalContent<boolean> {

  @Input()
  text!:string;

  constructor(
    private modal:ModalService
  ) { }

  onModalInit(): void {
    
  }

  ngOnInit(): void {
  }
  confirm(){
    this.modal._complete('complete', true);
  }
  cancel(){
    this.modal._complete('complete', false);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'hrt-modal-header',
  templateUrl: './modal-header.component.html',
})
export class ModalHeaderComponent implements OnInit {
  @Input()
  title?:string;

  constructor(
    private modal:ModalService
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.modal._complete('cancel', null);
  }

}

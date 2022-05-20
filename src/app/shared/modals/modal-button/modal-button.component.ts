import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '../modal.service';


@Component({
  selector: 'modal-button',
  templateUrl: './modal-button.component.html',
})
export class ModalButtonComponent implements OnInit {

  @Output()
  click = new EventEmitter();
  @Input()
  disabled:boolean = false;
  @Input()
  role:'dismiss' | 'custom' = 'custom';
  @Input()
  class:string = '';

  constructor(
    private modal:ModalService
  ) { }

  ngOnInit(): void {
  }
  onClick(){
    this.click.emit();
    if (this.role === 'dismiss')
      this.modal._complete('cancel', null);
  }
}

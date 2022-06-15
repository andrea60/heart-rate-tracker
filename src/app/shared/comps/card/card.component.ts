import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'hrt-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Output()
  onLongPress = new EventEmitter();

  @Output()
  click = new EventEmitter();
  @Input('customClass')
  class:string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

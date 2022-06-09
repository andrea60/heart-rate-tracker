import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'hrt-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Output()
  onLongPress = new EventEmitter();

  @Output()
  click = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

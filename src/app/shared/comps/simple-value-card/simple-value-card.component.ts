import { Component, Input, OnInit } from '@angular/core';
import { Icon, IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'hrt-simple-value-card',
  templateUrl: './simple-value-card.component.html',
})
export class SimpleValueCardComponent implements OnInit {

  @Input()
  icon?:IconProp;
  @Input()
  value:number | string | null = '';
  @Input()
  um: string = '';

  @Input()
  type:'string' | 'number' | 'time' = 'number';

  get isNumber() { return typeof this.value === 'number' };

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'hrt-icon',
  templateUrl: './icon.component.html',
  styles: [
    ':host { display: inline }'
  ]
})
export class IconComponent implements OnInit {
  @Input()
  icon?:string | null;

  protected get faIcon(): IconProp {
    return (this.icon as IconProp) || 'square';
  }
  constructor() { }

  ngOnInit(): void {
  }

}

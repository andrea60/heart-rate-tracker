import { Component, Input, OnInit } from '@angular/core';
import { HRZone } from 'src/app/models/hr-zones.model';

@Component({
  selector: 'hrt-zone-badge',
  templateUrl: './zone-badge.component.html',
})
export class ZoneBadgeComponent implements OnInit {

  @Input()
  zone:HRZone | null = 0;
  constructor() { }

  ngOnInit(): void {
  }

}

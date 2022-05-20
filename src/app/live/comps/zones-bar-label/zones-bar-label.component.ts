import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { combineLatest, map } from 'rxjs';
import { ObservableInputs } from 'src/app/lib/observable-inputs';
import { HRZone } from 'src/app/models/hr-zones.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'hrt-zones-bar-label',
  templateUrl: './zones-bar-label.component.html',
})
export class ZonesBarLabelComponent implements OnInit, OnChanges {
  private readonly inputs = new ObservableInputs();
  @Input()
  label:string = '0';

  @Input()
  zone:HRZone = 0;
  zone$ = this.inputs.observe(() => this.zone);

  @Input()
  active = false;
  active$ = this.inputs.observe(() => this.active);

  @Input()
  flip = false;

  color$ = combineLatest([this.active$, this.zone$]).pipe(
    map(([active, zone]) => active ? environment.theme[zone] : '')
  )

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.inputs.onChanges();
  }

}

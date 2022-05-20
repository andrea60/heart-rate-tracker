import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { combineLatest, filter, map, tap } from 'rxjs';
import { iterateObj } from 'src/app/lib/iterate-obj';
import { ObservableInputs } from 'src/app/lib/observable-inputs';
import { getHRZone } from 'src/app/logic/get-hr-zone';
import { getHRZonesBpm } from 'src/app/logic/get-hr-zones';
import { HRValue } from 'src/app/models/hr-value.model';
import { generateHRZoneData, HRZone, HRZoneData } from 'src/app/models/hr-zones.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'hrt-zones-bar',
  templateUrl: './zones-bar.component.html',
  styleUrls: ['zones-bar.component.scss']
})
export class ZonesBarComponent implements OnInit, OnChanges {
  private readonly inputs = new ObservableInputs();
  @Input()
  value: HRValue | null = null;
  value$ = this.inputs.observe(() => this.value).pipe(filter(v => !!v));
  @Input()
  hrMax: number | null = null;
  hrMax$ = this.inputs.observe(() => this.hrMax).pipe(filter(v => !!v));
  @Input()
  height: string = '10px';


  currentZone$ = this.value$.pipe(
    map(val => getHRZone(val!.perc)) // safe because of filter on 'value$'
  )

  perc$ = this.value$.pipe(
    map(v => {
      // here perc gets rimapped since the bar only shows [50, 90]
      // so the progress width must be calculated to range only from 50% to 90% with 50% (hr) == 0% (width) and 90% (hr) == 100% (width)
      const {perc} = v!;
      if (perc < 50)
        return 0;
      else if (perc > 90)
        return 100;
      else 
        return(v!.perc - 50) / 40 * 100
    } )
  );
  width$ = this.perc$.pipe(map(perc => perc.toFixed(2) + "%"))

  zones$ = combineLatest([this.currentZone$, this.hrMax$]).pipe(
    map(([current, hrMax]) => ({ current, zones: getHRZonesBpm(hrMax!)})),
    map(({ current, zones }) => 
      iterateObj(zones)
        .map(({key, value}) => ({
          i: key as HRZone,
          color: environment.theme[key as HRZone],
          active: key <= current,
          fromBpm: value.bpmFrom
        }
      )
    ))
  )

  get ready() {
    return !!this.value && !!this.hrMax;
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.inputs.onChanges();
  }
  zoneChanged(index:number, zone:{ active:boolean }) {
    return zone.active;
  }
}

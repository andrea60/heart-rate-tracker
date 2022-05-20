import { Pipe, PipeTransform } from '@angular/core';
import { HRZone } from 'src/app/models/hr-zones.model';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'zoneLabel'
})
export class ZoneLabelPipe implements PipeTransform {

  transform(value: HRZone | null): string {
    if (value === null || value === undefined)
      return '';
    return environment.zonesConfig[value].label;
  }

}

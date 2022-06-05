import { Injectable, Pipe, PipeTransform } from '@angular/core';
import getSessionDuration from 'src/app/logic/session/get-session-duration';
import { ActivitySession } from 'src/app/models/activity-session.model';

export type DurationFormat = 'h:m:s' | 'tot_mins';

@Pipe({
  name: 'duration'
})
@Injectable({providedIn:'root'})
export class DurationPipe implements PipeTransform {

  transform(x: number | ActivitySession, format:DurationFormat): string {
    let secs = 0;
    if (typeof x === 'number')
      secs = x;
    else 
      secs = getSessionDuration(x);

    if (format === 'h:m:s'){
      const minutes = Math.floor(secs / 60);
      const hours = Math.floor(minutes / 60);

      return `${pad(hours % 60)}:${pad(minutes % 60)}:${pad(secs % 60)}`;
    } else if (format === 'tot_mins') {
      const minutes = Math.round(secs / 60);
      return minutes.toFixed(0);
    }
    return '';
  }

}

function pad(num: number) {
  return num.toFixed(0).padStart(2, '0');
}

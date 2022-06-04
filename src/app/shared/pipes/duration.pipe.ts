import { Injectable, Pipe, PipeTransform } from '@angular/core';

export type DurationFormat = 'h:m:s' | 'tot_mins';

@Pipe({
  name: 'duration'
})
@Injectable({providedIn:'root'})
export class DurationPipe implements PipeTransform {

  transform(x: number, format:DurationFormat): string {
    if (format === 'h:m:s'){
      const secs = x;
      const minutes = Math.floor(secs / 60);
      const hours = Math.floor(minutes / 60);

      return `${pad(hours % 60)}:${pad(minutes % 60)}:${pad(secs % 60)}`;
    } else if (format === 'tot_mins') {
      const minutes = Math.round(x / 60);
      return minutes.toFixed(0);
    }
    return '';
  }

}

function pad(num: number) {
  return num.toFixed(0).padStart(2, '0');
}

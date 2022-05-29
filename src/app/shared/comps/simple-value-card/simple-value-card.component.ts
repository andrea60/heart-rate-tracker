import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Icon, IconProp } from '@fortawesome/fontawesome-svg-core';
import { map } from 'rxjs';
import { ObservableInputs } from 'src/app/lib/observable-inputs';

@Component({
  selector: 'hrt-simple-value-card',
  templateUrl: './simple-value-card.component.html',
})
export class SimpleValueCardComponent implements OnInit, OnChanges {
  private readonly inputs = new ObservableInputs();
  @Input()
  icon?:IconProp;
  @Input()
  value:number | string | null = '';
  value$ = this.inputs.observe(() => this.value);

  @Input()
  um: string = '';
  @Input()
  decimals:number = 0;

  @Input()
  type:'string' | 'number' | 'time' = 'number';

  numValue$ = this.value$.pipe(map(v => (v as number)?.toFixed(this.decimals)));
  timeValue$ = this.value$.pipe(map(x => {
    const secs = x! as number;
    const minutes = Math.floor(secs / 60);
    const hours = Math.floor(minutes / 60);

    return `${this.pad(hours % 60)}:${this.pad(minutes % 60)}:${this.pad(secs % 60)}`;
  }));

  pad(num: number) {
    return num.toFixed(0).padStart(2, '0');
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.inputs.onChanges();
  }

  ngOnInit(): void {
  }

}

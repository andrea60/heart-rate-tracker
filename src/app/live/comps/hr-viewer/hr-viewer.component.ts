import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { HRValue } from 'src/app/models/hr-value.model';
import * as Highcharts from 'highcharts';
import { HRZone, HRZoneData } from 'src/app/models/hr-zone-data.model';
import { ObservableInputs } from 'neo-observable-input';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'hrt-hr-viewer',
  templateUrl: './hr-viewer.component.html',
  styleUrls:['./hr-viewer.component.scss']
})
export class HrViewerComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  options: Highcharts.Options = {
    chart: {
      backgroundColor: 'transparent',
      type: 'pie',
      margin:0,
    },
    plotOptions:{
      pie:{
        dataLabels:{
          enabled: false
        },
        borderWidth:0,
        innerSize:'85%',
        tooltip: {
          pointFormatter: undefined
        }
      }
    },
    title: { text: undefined },
    credits: {
      enabled: false
    },
    series: []
  }

  @Input()
  value: HRValue | null = null;

  @Input()
  zones: HRZoneData<{ perc: number }> | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.redraw();
  }
  chooseColor(z:HRZone){
    return environment.theme[z];
  }
  redraw() {
    if (!this.zones)
      return;

    const data = Object.keys(this.zones)
      .map(x => parseInt(x))
      .map(z => ({
        name: 'Zone ' + z,
        color: this.chooseColor(z as HRZone),
        y: this.zones![z].perc
      }));

    this.options.series![0] = {
      type:'pie',
      name:'HR Zones',
      data
    }

    // trigger the update
    this.updateFlag = true;

  }

}

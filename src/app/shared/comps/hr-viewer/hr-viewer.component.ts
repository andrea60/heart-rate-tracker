import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { HRValue } from 'src/app/models/hr-value.model';
import * as Highcharts from 'highcharts';
import { HRZone, HRZoneData } from 'src/app/models/hr-zones.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'hrt-hr-viewer',
  templateUrl: './hr-viewer.component.html',
  styleUrls:['./hr-viewer.component.scss']
})
export class HrViewerComponent implements OnInit {
  protected Highcharts: typeof Highcharts = Highcharts;
  protected updateFlag = false;

  protected options: Highcharts.Options = {
    chart: {
      backgroundColor: 'transparent',
      type: 'pie',
      margin:0
    },

    plotOptions:{
      pie:{
        dataLabels:{
          enabled: false,
          distance: -15,
          format:'{point.percentage:.0f} %',
          filter: {
            property: 'percentage',
            operator: '>',
            value: 5
          },
        },
        borderWidth:0,
        innerSize:'85%',
        tooltip: {
          pointFormatter: undefined,
          valueDecimals:0,
          valueSuffix:'%'
        }
      },
    },
    title: { text: this.title },
    credits: {
      enabled: false
    },
    series: []
  }
  @Input()
  mode: 'live' | 'review' = 'live';

  @Input()
  value: HRValue | null = null;

  @Input()
  zones: HRZoneData<{ perc: number }> | null = null;

  @Input()
  size:String = '12rem';

  @Input()
  title?:string;



  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.redraw();
  }
  chooseColor(z:HRZone){
    return environment.zonesConfig[z].color;
  }
  redraw() {
    if (!this.zones)
      return;
    // update data
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


    // update configuration
    const pieOptions = this.options.plotOptions!.pie!;
    pieOptions.innerSize = this.mode === 'live' ? '85%' : '60%';
    (pieOptions.dataLabels as Highcharts.SeriesPieDataLabelsOptionsObject)!.enabled = this.mode == 'review';


    // trigger the update
    this.updateFlag = true;

  }

}

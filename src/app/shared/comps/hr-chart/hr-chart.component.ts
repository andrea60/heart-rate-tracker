import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HRValue } from 'src/app/models/hr-value.model';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { HRZoneConfig } from 'src/app/models/user-params.model';
import { HRZonesConfig } from 'src/app/models/hr-zones.config';
import { ComputedHRZone, getHRZonesBpm } from 'src/app/logic/get-hr-zones';
import { ZoneLabelPipe } from '../../pipes/zone-label.pipe';
import { HRZone, HRZoneData } from 'src/app/models/hr-zones.model';
import { environment } from 'src/environments/environment';
import { writeStyle } from 'src/app/lib/write-style';
function pad(num: number) {
  return num.toFixed(0).padStart(2, '0');
}
@Component({
  selector: 'hrt-hr-chart',
  templateUrl: './hr-chart.component.html',
})
export class HrChartComponent implements OnChanges {
  Highcharts: typeof Highcharts = Highcharts;

  @Input()
  values: HRValue[] = [];
  @Input()
  hrMax: number | null = null;
  @Input()
  class: string = '';
  @Input()
  height: string = '14rem';

  hrZones?: (ComputedHRZone & { i: number })[];


  options: Highcharts.Options = {
    title: {
      text: ''
    },
    chart: {
      backgroundColor: 'transparent',
      marginLeft:35,
      marginRight:35
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      line: {
        marker: { enabled: false }
      },
      area: {
        marker: { enabled: false },
        fillOpacity: 0.1
      }
    },
    yAxis: [{
      gridLineWidth: 0,
      title: {
        text: ''
      },
      offset: -10,
      labels: {
        useHTML: true,
        padding: 0,
        formatter: this.formatLabel(this, z => z.bpmFrom)
      }
    }, {
      gridLineWidth: 0,
      opposite: true,
      title: {
        text: ''
      },
      offset:-10,
      labels: {
        useHTML: true,
        padding: 0,
        formatter: this.formatLabel(this, z => `Z${z.i}`)
      }
    }],
    xAxis: {
      gridLineWidth: 1,
      labels: {
        formatter: function () {
          const x = this.value as number;
          const secs = (x / 1000);
          const minutes = Math.floor(secs / 60);
          const hours = Math.floor(minutes / 60);

          return `${pad(hours % 60)}:${pad(minutes % 60)}:${pad(secs % 60)}`;
        }
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      type: 'line',
      name: 'Heart Rate',
      data: []
    }],
  }

  updateFlag: boolean = false;

  constructor(
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.hrMax)
      return;
    const zones = getHRZonesBpm(this.hrMax!);
    this.hrZones = Object.keys(zones).map((z, i) => ({ ...zones[+z], i }));

    this.updateChart();

    // trigger update
    this.updateFlag = true;
  }

  updateChart() {
    
    // set data
    this.options.series![0] = {
      type: 'area',
      data: this.generateChartData()
    };
    // set yAxis range
    const min = this.hrZones!.find(z => z.i == 0)!.bpmFrom - 10;
    const max = this.hrZones!.find(z => z.i == 4)!.bpmFrom + 10;
  
    if (Array.isArray(this.options.yAxis)) {
      const yAxisOpts = { max, min, tickPositions: [min, ...this.hrZones!.map(z => z.bpmFrom), max] }
      this.options.yAxis[0] = {
        ...this.options.yAxis[0],
        ...yAxisOpts,
        plotLines: this.generatePlotLines(),
      }

      this.options.yAxis[1] = {
        ...this.options.yAxis[1],
        ...yAxisOpts
      }
    }

    this.options.plotOptions!.area = {
      ...this.options.plotOptions!.area,
      zones: this.generateZones()
    }
  }
  generateZones(): Highcharts.SeriesZonesOptionsObject[] {
    const zones = this.hrZones!.map(zone => ({
      value: zone.bpmTo,
      color: environment.zonesConfig[zone.i].color,
    }));
    const lower = {
      value: this.hrZones![0].bpmFrom - 1,
      color: '#888'
    }
    return [lower, ...zones];
  }

  generatePlotLines(): Highcharts.YAxisPlotLinesOptions[] {
    const zones = getHRZonesBpm(this.hrMax!);
    return Object.keys(zones).map(z => zones[+z]).map((z, i) => ({
      value: z.bpmFrom,
      width: 1,
      color: environment.zonesConfig[i as HRZone].color,
      dashStyle: 'LongDash'
    }))
  }
  generateChartData() {
    return this.values.map(v => ({
      x: v.offset,
      y: v.bpm
    }))
  }

  formatLabel(comp: HrChartComponent, project: (zone:ComputedHRZone & { i: number }) => string | number): Highcharts.AxisLabelsFormatterCallbackFunction {
    return function () {
      const zone = comp.hrZones!.find(z => z.bpmFrom === this.value);
      if (!zone)
        return '';
      const color = environment.zonesConfig[zone.i].color;
      const style = {
        'background-color': color,
        'padding': '2px 0',
        'font-weight': 'bold',
        'color': '#fff',
        'width': '30px',
        'text-align': 'center',
        'border-radius': '3px'
      }
      return `<div style='${writeStyle(style)}'>${project(zone)}</div>`;
    }
  }

}

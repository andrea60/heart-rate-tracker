import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveViewComponent } from './pages/live-view/live-view.component';
import { LiveRoutingModule } from './live-routing.module';
import { HrViewerComponent } from './comps/hr-viewer/hr-viewer.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LiveViewComponent,
    HrViewerComponent
  ],
  imports: [
    CommonModule,
    LiveRoutingModule,
    HighchartsChartModule,
    SharedModule
  ]
})
export class LiveModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveViewComponent } from './pages/live-view/live-view.component';
import { LiveRoutingModule } from './live-routing.module';
import { HrViewerComponent } from './comps/hr-viewer/hr-viewer.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedModule } from '../shared/shared.module';
import { ZonesBarComponent } from './comps/zones-bar/zones-bar.component';
import { ZonesBarLabelComponent } from './comps/zones-bar-label/zones-bar-label.component';
import { StartSessionComponent } from './pages/start-session/start-session.component';



@NgModule({
  declarations: [
    LiveViewComponent,
    HrViewerComponent,
    ZonesBarComponent,
    ZonesBarLabelComponent,
    StartSessionComponent
  ],
  imports: [
    CommonModule,
    LiveRoutingModule,
    HighchartsChartModule,
    SharedModule
  ]
})
export class LiveModule { }

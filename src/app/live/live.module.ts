import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveViewComponent } from './pages/live-view/live-view.component';
import { LiveRoutingModule } from './live-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedModule } from '../shared/shared.module';
import { ZonesBarComponent } from './comps/zones-bar/zones-bar.component';
import { ZonesBarLabelComponent } from './comps/zones-bar-label/zones-bar-label.component';
import { StartSessionComponent } from './pages/start-session/start-session.component';
import { SessionSettingsComponent } from './comps/session-settings/session-settings.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LiveViewComponent,
    ZonesBarComponent,
    ZonesBarLabelComponent,
    StartSessionComponent,
    SessionSettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LiveRoutingModule,
    HighchartsChartModule,
    SharedModule
  ]
})
export class LiveModule { }

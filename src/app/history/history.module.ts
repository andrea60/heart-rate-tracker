import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryRoutingModule } from './history-routing.module';
import { SessionsListPageComponent } from './pages/sessions-list-page/sessions-list-page.component';
import { SessionEntryComponent } from './comps/session-entry/session-entry.component';
import { SharedModule } from '../shared/shared.module';
import { SessionDetailsComponent } from './comps/session-details/session-details.component';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  declarations: [
    SessionsListPageComponent,
    SessionEntryComponent,
    SessionDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HighchartsChartModule,
    HistoryRoutingModule
  ]
})
export class HistoryModule { }

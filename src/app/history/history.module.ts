import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryRoutingModule } from './history-routing.module';
import { SessionsListPageComponent } from './pages/sessions-list-page/sessions-list-page.component';
import { SessionEntryComponent } from './comps/session-entry/session-entry.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    SessionsListPageComponent,
    SessionEntryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HistoryRoutingModule
  ]
})
export class HistoryModule { }

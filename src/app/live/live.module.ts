import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveViewComponent } from './pages/live-view/live-view.component';
import { LiveRoutingModule } from './live-routing.module';
import { HrViewerComponent } from './comps/hr-viewer/hr-viewer.component';



@NgModule({
  declarations: [
    LiveViewComponent,
    HrViewerComponent
  ],
  imports: [
    CommonModule,
    LiveRoutingModule
  ]
})
export class LiveModule { }

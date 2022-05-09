import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveViewComponent } from './pages/live-view/live-view.component';
import { LiveRoutingModule } from './live-routing.module';



@NgModule({
  declarations: [
    LiveViewComponent
  ],
  imports: [
    CommonModule,
    LiveRoutingModule
  ]
})
export class LiveModule { }

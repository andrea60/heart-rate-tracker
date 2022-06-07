import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ZoneLabelPipe } from './pipes/zone-label.pipe';
import { ZoneBadgeComponent } from './comps/zone-badge/zone-badge.component';
import { SpinnerComponent } from './comps/spinner/spinner.component';
import { HrChartComponent } from './comps/hr-chart/hr-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ModalsModule } from '../modals/modals.module';
import { CardComponent } from './comps/card/card.component';
import { SimpleValueCardComponent } from './comps/simple-value-card/simple-value-card.component';
import { DurationPipe } from './pipes/duration.pipe';
import { HrViewerComponent } from './comps/hr-viewer/hr-viewer.component';
import { LongPressDirective } from './directives/long-press.directive';



@NgModule({
  declarations: [
    ZoneLabelPipe,
    ZoneBadgeComponent,
    SpinnerComponent,
    HrChartComponent,
    CardComponent,
    SimpleValueCardComponent,
    DurationPipe,
    HrViewerComponent,
    LongPressDirective
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ModalsModule,
    HighchartsChartModule
  ],
  exports:[
    FontAwesomeModule,
    ZoneBadgeComponent,
    SpinnerComponent,
    ZoneLabelPipe,
    DurationPipe,
    HrChartComponent,
    CardComponent,
    SimpleValueCardComponent,
    HrViewerComponent,
    LongPressDirective
  ]
})
export class SharedModule { }

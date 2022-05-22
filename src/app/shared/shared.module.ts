import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ZoneLabelPipe } from './pipes/zone-label.pipe';
import { ZoneBadgeComponent } from './comps/zone-badge/zone-badge.component';
import { SpinnerComponent } from './comps/spinner/spinner.component';
import { ModalRendererComponent } from './modals/modal-renderer/modal-renderer.component';
import { ModalTargetDirective } from './modals/modal-target.directive';
import { ModalButtonComponent } from './modals/modal-button/modal-button.component';
import { ModalFooterComponent } from './modals/modal-footer/modal-footer.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { HrChartComponent } from './comps/hr-chart/hr-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  declarations: [
    ZoneLabelPipe,
    ZoneBadgeComponent,
    SpinnerComponent,
    ModalRendererComponent,
    ModalTargetDirective,
    ModalButtonComponent,
    ModalFooterComponent,
    ConfirmDialogComponent,
    HrChartComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HighchartsChartModule
  ],
  exports:[
    FontAwesomeModule,
    ZoneBadgeComponent,
    SpinnerComponent,
    ZoneLabelPipe,
    ModalRendererComponent,
    ModalButtonComponent,
    ModalFooterComponent,
    HrChartComponent
  ]
})
export class SharedModule { }

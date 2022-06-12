import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewChecked, AfterViewInit, Component, Input, OnInit, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { filter, switchMap, take, tap } from 'rxjs';
import { switchAdd } from 'src/app/lib/switch-add';
import { ModalContent } from '../modal-content';
import { ModalRenderConf } from '../modal-render-conf.model';
import { ModalTargetDirective } from '../modal-target.directive';
import { ModalService, ModalType } from '../modal.service';

@Component({
  selector: 'hrt-modal-renderer',
  templateUrl: './modal-renderer.component.html',
  styleUrls: ['./modal-renderer.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.3s ease-out', style({ opacity: '*' }))
      ]),
      transition(':leave', [
        style({ opacity: '*' }),
        animate('.3s ease-in', style({ opacity: 0 }))
      ]),
    ]),
    trigger('slide', [
      transition(':enter', [
        style({ transform: 'translateY(1000px)' }),
        animate('.25s cubic-bezier(0.250, 0.460, 0.450, 0.940)', style({ transform: '*' }))
      ]),
      transition(':leave', [
        style({ transform: '*' }),
        animate('.3s cubic-bezier(0.250, 0.460, 0.450, 0.940)', style({ transform: 'translateY(1000px)' }))
      ]),
    ])
  ]
})
export class ModalRendererComponent implements OnInit, AfterViewInit {

  @ViewChildren(ModalTargetDirective)
  renderTarget!: QueryList<ModalTargetDirective>;
  open: boolean = false;
  componentReady: boolean = false;
  conf?:ModalRenderConf;

  constructor(
    private modalSrv: ModalService
  ) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    // OPEN
    this.modalSrv.out$.pipe(
      filter(({ action }) => action === 'open'),
      tap(() => this.open = true),
      switchAdd(() => this.renderTarget.changes.pipe(take(1)))
    ).subscribe((([descr]) => {
      // all preliminary operations have completed, now component can render
      setTimeout(() => {
        this.conf = descr.conf;
        this.renderComponent(descr.componentClass!, descr.inputs);
        console.log('Opening modal with conf ', this.conf);
      }, 1);
    }));


    // CLOSE
    this.modalSrv.out$.pipe(
      filter(({ action }) => action === 'close')
    ).subscribe(() => {
      console.log('closing modal')
      this.deleteComponent();
      this.open = false;
    })
  }

  private renderComponent<C extends ModalContent<any>>(componentClass: Type<C>, inputs?: Partial<C>) {
    if (!this.renderTarget.last)
      return;
    const { viewContainerRef } = this.renderTarget.last;
    viewContainerRef.clear();

    const { instance } = viewContainerRef.createComponent<C>(componentClass);
    if (inputs) {
      for (let k in inputs)
        instance[k] = inputs[k]!;
    }

    instance.onModalInit();

    this.componentReady = true;
  }
  private deleteComponent() {
    const { viewContainerRef } = this.renderTarget.last;
    viewContainerRef.clear();
    this.componentReady = false;
  }

}

import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, timer, withLatestFrom } from 'rxjs';
import { joinState } from 'src/app/lib/join-state';
import { ModalService } from 'src/app/modals/modal.service';
import { SessionStatus } from 'src/app/state/activity-session/activity-session.reducers';
import { ActivitySessionActions } from 'src/app/state/app.actions';
import { ActivitySessionSelectors } from 'src/app/state/app.selectors';


@Component({
  selector: 'hrt-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('rotateIn', [
      transition(':enter', [
        style({ transform: 'rotateX(80deg)', opacity: 0 }),
        animate('.5s ease-out', style({
          transform: 'rotateX(0)',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({ transform: 'rotateX(0deg)', opacity: 1 }),
        animate('.5s ease-in', style({
          transform: 'rotateX(80deg)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {
  private links:NavLink[] = [
    { path: '/live/start-session', icon: 'fire', session:['idle'] },
    { path: '/settings', icon: 'cogs', session:['idle'] },
    { path: '/history', icon: 'clock-rotate-left', session:['idle'] },

    { icon:'pause', click:() => this.pause(), session:['running'] },
    { icon:'stop', click:() => this.stop(), color:'rgb(239,68,68)', session:['running']},
    { icon:'play', click:() => this.resume(), session:['paused'] },


    
  ];

  links$ = this.store.select(ActivitySessionSelectors.getStatus).pipe(
    map(status => this.links.map(link => {
      let visible = false;
      if (!link.session)
        visible = true;
      else 
        visible = link.session.includes(status);
      return { ...link, visible };
    }))
  )

  show$ = this.links$.pipe(
    map(links => links.some(l => l.visible))
  )

  constructor(
    private store: Store,
    private modal:ModalService,
    private router:Router
  ) { }

  ngOnInit(): void {
    
  }
  isLast(links:RenderedNavLink[], link:RenderedNavLink){
    const [last] = links.filter(l => l.visible).slice(-1);
    return last == link;
  }

  trackLink(index:number, link:RenderedNavLink){
    // important to avoid angular re-drawing the list, so animations can complete
    return link.path || link.click;
  }
  triggerAction(link:NavLink) {
    if (link.click)
      link.click();
    return false;
  }
  pause(){
    this.store.dispatch(ActivitySessionActions.pauseSession());
  }
  resume(){
    this.store.dispatch(ActivitySessionActions.resumeSession())
  }
  stop(){
    this.modal.openConfirmDialog('Are you sure you want to stop?').pipe(
      joinState(() => this.store.select(ActivitySessionSelectors.getCurrentSession))
    ).subscribe(([modal, session]) => {
      if (modal.data === true){
        this.store.dispatch(ActivitySessionActions.closeSession());
        this.router.navigate(['/history', session!.id])
      }
    }) 
  }
}


interface NavLink {
  path?: string;
  click?: () => void,
  icon: IconProp;
  session?: SessionStatus[];
  color?:string;
}
interface RenderedNavLink extends NavLink {
  visible: boolean;
}
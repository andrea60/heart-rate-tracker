import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'hrt-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  links: NavLink[] = [
    { path:'/live', icon:'play' },
    { path:'/settings', icon:'cogs' },
    { path:'/history', icon:'clock-rotate-left' }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}


interface NavLink {
  path:string;
  icon:IconProp;
}
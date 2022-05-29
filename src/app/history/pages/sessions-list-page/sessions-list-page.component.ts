import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ArchiveSelectors } from 'src/app/state/app.selectors';

@Component({
  selector: 'hrt-sessions-list-page',
  templateUrl: './sessions-list-page.component.html',
})
export class SessionsListPageComponent implements OnInit {

  sessions$ = this.store.select(ArchiveSelectors.getAll);

  constructor(
    private store:Store
  ) { }

  ngOnInit(): void {
  }

}

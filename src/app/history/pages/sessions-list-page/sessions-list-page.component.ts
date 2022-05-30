import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { map } from 'rxjs';
import { groupBy } from 'src/app/lib/array/group-by';
import { ArchiveSelectors } from 'src/app/state/app.selectors';

@Component({
  selector: 'hrt-sessions-list-page',
  templateUrl: './sessions-list-page.component.html',
})
export class SessionsListPageComponent implements OnInit {

  sessions$ = this.store.select(ArchiveSelectors.getAll);

  weeks$ = this.sessions$.pipe(map(rows => groupBy(rows, item => moment(item.start).week())))

  constructor(
    private store:Store
  ) { }

  ngOnInit(): void {
  }



}

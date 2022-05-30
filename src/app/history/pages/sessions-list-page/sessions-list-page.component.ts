import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { map } from 'rxjs';
import { groupBy } from 'src/app/lib/array/group-by';
import { sortBy } from 'src/app/lib/array/sort';
import { iterateObj } from 'src/app/lib/iterate-obj';
import { ArchiveSelectors } from 'src/app/state/app.selectors';

@Component({
  selector: 'hrt-sessions-list-page',
  templateUrl: './sessions-list-page.component.html',
})
export class SessionsListPageComponent implements OnInit {
  currentWeek = moment().week();

  sessions$ = this.store.select(ArchiveSelectors.getAll).pipe(
    map(rows => sortBy(rows, r => r.start, 'desc'))
  );

  weekGroups$ = this.sessions$.pipe(
    map(rows => groupBy(rows, item => moment(item.start).week())),
    map(iterateObj)
  );

  constructor(
    private store:Store
  ) { }

  ngOnInit(): void {
  }


  getLabel(week:number){
    if (week == this.currentWeek)
      return 'This week';
    else if (week == this.currentWeek - 1)
      return 'Last week';
    else {
      const date = moment(week, 'W');
      const start = date.startOf('week').format('L');
      const end = date.endOf('week').format('L');
      return `${start} - ${end}`;
    }

  }


}

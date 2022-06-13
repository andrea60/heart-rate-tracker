import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { map } from 'rxjs';
import { groupBy } from 'src/app/lib/array/group-by';
import { sortBy } from 'src/app/lib/array/sort';
import { iterateObj } from 'src/app/lib/iterate-obj';
import { ModalService } from 'src/app/modals/modal.service';
import { ArchiveSelectors } from 'src/app/state/app.selectors';
import { SessionDetailsComponent } from '../../comps/session-details/session-details.component';

@Component({
  selector: 'hrt-sessions-list-page',
  templateUrl: './sessions-list-page.component.html',
})
export class SessionsListPageComponent implements OnInit {
  currentWeek = moment().isoWeek();

  sessions$ = this.store.select(ArchiveSelectors.getAll).pipe(
    map(rows => sortBy(rows, r => r.start, 'desc'))
  );

  weekGroups$ = this.sessions$.pipe(
    map(rows => groupBy(rows, item => moment(item.start).isoWeek())),
    map(iterateObj),
    map(g => sortBy(g, g => g.key, 'desc'))
  );

  constructor(
    private store:Store,
    private activeRoute:ActivatedRoute,
    private modal:ModalService
  ) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      if (params.has('id'))
        this.modal.openModal(SessionDetailsComponent, { type:'card', title: 'Session details', inputs: { id: params.get('id')! }});
    })
  }


  getLabel(week:number){
    if (week == this.currentWeek)
      return 'This week';
    else if (week == this.currentWeek - 1)
      return 'Last week';
    else {
      const date = moment(week, 'W');
      const start = date.startOf('isoWeek').format('ddd ll');
      const end = date.endOf('isoWeek').format('ddd ll');
      return `${start} - ${end}`;
    }

  }


}

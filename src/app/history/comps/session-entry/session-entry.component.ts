import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ActivitySession } from 'src/app/models/activity-session.model';
import { ActivitySessionSelectors } from 'src/app/state/app.selectors';

@Component({
  selector: 'hrt-session-entry',
  templateUrl: './session-entry.component.html',
})
export class SessionEntryComponent implements OnInit {
  DEFAULT_ICON = 'local_fire_department';
  @Input()
  session!: ActivitySession;
  sessionType$ = this.store.select(ActivitySessionSelectors.getTypes).pipe(
    map(types => types.find(t => t.id === this.session.activityTypeId)?.icon),
    map(icon => icon || this.DEFAULT_ICON)
  )
  constructor(
    private store:Store
  ) { }

  ngOnInit(): void {
    if (!this.session)
      throw 'SessionEntryComponent must have a session input';
  }

}

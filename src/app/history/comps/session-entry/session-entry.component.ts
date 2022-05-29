import { Component, Input, OnInit } from '@angular/core';
import { ActivitySession } from 'src/app/models/activity-session.model';

@Component({
  selector: 'hrt-session-entry',
  templateUrl: './session-entry.component.html',
})
export class SessionEntryComponent implements OnInit {

  @Input()
  session!: ActivitySession;
  constructor() { }

  ngOnInit(): void {
    if (!this.session)
      throw 'SessionEntryComponent must have a session input';
  }

}

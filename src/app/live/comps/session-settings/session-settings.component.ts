import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { getActivityTypes } from 'src/app/logic/get-session-types';
import { ActivitySessionSettings } from 'src/app/models/activity-session-settings.model';


@Component({
  selector: 'hrt-session-settings',
  templateUrl: './session-settings.component.html',
})
export class SessionSettingsComponent implements OnInit {
  _settings!:ActivitySessionSettings;
  @Input()
  set settings(val:ActivitySessionSettings | undefined){
    if (!val) return;

    this._settings = val;
    this.form.patchValue(val);
  }
  @Output()
  settingsChange = new EventEmitter<ActivitySessionSettings>();

  @Input('class')
  customClass:string = '';

  types$ = getActivityTypes();

  form = new FormGroup({
    activityTypeId: new FormControl(null, [Validators.required])
  })

  constructor() { }

  ngOnInit(): void {
    if (!this._settings)
      this.settings = {
        activityTypeId: '...'
      }
    
    this.form.valueChanges.pipe(
      filter(() => this.form.valid)
    ).subscribe(() => {
      this.settingsChange.emit(this.form.value);
    })
  }


}

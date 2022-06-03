import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { ActivitySessionSettings } from 'src/app/models/activity-session-settings.model';
import { ActivitySessionSelectors } from 'src/app/state/app.selectors';


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

  types$ = this.store.select(ActivitySessionSelectors.getTypes);

  form = new UntypedFormGroup({
    activityTypeId: new UntypedFormControl(null, [Validators.required])
  })

  constructor(
    private store:Store
  ) { }

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

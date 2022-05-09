import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/state/user/user.reducers';
import { UserActions } from 'src/app/state/app.actions';
import { UserSelectors } from 'src/app/state/app.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  loading$ = this.store.select(UserSelectors.isLoading);
  error$ = this.store.select(UserSelectors.hasError);

  constructor(private store:Store<UserState>) { }

  ngOnInit(): void {
  }

  login(){
    if (this.form.invalid)
      return;

    const { email, password } = this.form.value;
    
    this.store.dispatch(UserActions.loginRequest({ email, password })); 
  }
}

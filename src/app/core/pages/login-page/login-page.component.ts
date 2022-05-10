import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, mapTo, take } from 'rxjs';
import { UserActions } from 'src/app/state/app.actions';
import { UserSelectors } from 'src/app/state/app.selectors';
import { UserState } from 'src/app/state/user/user.reducers';

@Component({
  selector: 'hrt-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  loading$ = this.store.select(UserSelectors.isLoading);
  error$ = this.store.select(UserSelectors.hasError);
  success$ = this.store.select(UserSelectors.getCurrentUser).pipe(filter(usr => !!usr), mapTo(true));

  constructor(private store:Store<UserState>, private router:Router) { }

  ngOnInit(): void {
    this.success$.pipe(take(1)).subscribe(() => this.router.navigate(['/home']))
  }

  login(){
    if (this.loginForm.invalid)
      return;

    const { email, password } = this.loginForm.value;

    this.store.dispatch(UserActions.loginRequest({ email, password }));
  }

}

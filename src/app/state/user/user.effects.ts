import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY, map, mergeMap, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { UserActions } from "../app.actions";
import { loginFailed, loginRequest, loginSuccess } from "./user.actions";
import { UserState } from "./user.reducers";


@Injectable()
export class UserEffect {

    signIn$ = createEffect(() => this.actions$.pipe(
        ofType(loginRequest),
        mergeMap(({email,password}) =>
            // http request
            this.authSrv.signIn(email, password).pipe(
                tap(user => {
                    if (!!user)
                        this.authSrv.saveToken(user);
                }),
                map(loginResult => loginResult === false ? loginFailed() : loginSuccess(loginResult) )
            )
        )
    ))

    constructor(private actions$:Actions, private authSrv:AuthService, private store:Store<UserState>){
        // checks if user has a token saved on the browser
        this.authSrv.getToken().subscribe(user => {
            if (!!user)
                this.store.dispatch(UserActions.loginSuccess(user));
        })
    }
}
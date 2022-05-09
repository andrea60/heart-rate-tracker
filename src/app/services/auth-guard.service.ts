import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { UserSelectors } from '../state/app.selectors';
import { UserState } from '../state/user/user.reducers';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private store:Store<UserState>, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.store.select(UserSelectors.getCurrentUser).pipe(
      map(user => !!user),
      tap(ok => {
        if (!ok) this.router.navigate(['/login']);
      }));
  }
}

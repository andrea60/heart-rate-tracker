import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { ActivitySessionSelectors } from 'src/app/state/app.selectors';

@Injectable({
  providedIn: 'root'
})
export class InSessionService implements CanActivate {

  constructor(
    private store:Store, 
    private router:Router
    ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.store.select(ActivitySessionSelectors.hasActiveSession).pipe(
      tap(proceed => {
        if (!proceed)
          this.router.navigate(['/live','start-session'])
      })
    );
  }
}

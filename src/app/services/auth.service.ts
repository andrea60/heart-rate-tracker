import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, timer } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _users:(User & { password:string })[] = [
    { email: 'admin@test.it', name: 'Admin', id:'1', password:'asd123'},
    { email: 'user@test.it', name: 'User', id:'2', password:'ciaociao'}
  ]


  constructor(private http:HttpClient) { }

  signIn(email:string, password:string):Observable<User | false> {
    return timer(2500).pipe(
      map(() => {
        const user = this._users.find(usr => usr.email === email && usr.password === password);
        if (!user)
          return false;
        return user;
      })
    )
  }

  saveToken(user:User){
    const token = btoa(JSON.stringify(user));
    localStorage.setItem('auth-token', token);
  }

  getToken():Observable<User | null> {
    const token = localStorage.getItem('auth-token');
    if (!token)
      return of(null);
    
    const user:User = JSON.parse(atob(token));
    return of(user);
  }

}

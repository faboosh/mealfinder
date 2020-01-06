import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private signedInSource = new BehaviorSubject(false);
  signedIn = this.signedInSource.asObservable();
  private userSource = new BehaviorSubject(localStorage.getItem('user'));
  user = this.userSource.asObservable();
  authSnapshot:boolean;

  constructor(private http:HttpClient) { 

  }

  login(email:string, password:string):Observable<any> {
    this.http.post<any>('http://localhost:4201/login', {email, password}).subscribe(res => {
      console.log('user signed in');
      console.log(res);
      if(res.user) {
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', JSON.stringify(res.token));
        this.setUser();
        this.changeAuthStatus(true);
      } else {
        this.changeAuthStatus(false);
      }
    })


    return this.signedIn;
  }

  setUser() {
    this.userSource.next(localStorage.getItem('user'));
  }

  register(displayName:string, email:string, password:string):Observable<any> {
    return this.http.post<any>('http://localhost:4201/register', {displayName, email, password});
  }

  logout() {
    this.changeAuthStatus(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  changeAuthStatus(status:boolean) {
    this.signedInSource.next(status);
    this.authSnapshot = status;
  }

  isSignedIn() {
    this.signedIn.subscribe(auth => {
      return auth;
    });
  }
}

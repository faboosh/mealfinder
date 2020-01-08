import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  authSnapshot: boolean;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
    observe: 'response' as 'response'
  };

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    this.httpOptions.headers.append('Content-Type', 'credentials');
    this.http.post<any>('http://localhost:4201/login', { email, password }, this.httpOptions).subscribe(res => {
      console.log('user signed in');
      console.log(res);
    })


    return this.signedIn;
  }

  setUser() {
    let source = this.http.get<any>('http://localhost:4201/user').subscribe(user => {
      console.log('user from request');
      console.log(user);
      this.userSource.next(user);
      source.unsubscribe();
    });
  }

  register(displayName: string, email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:4201/register', { displayName, email, password });
  }

  logout() {
    this.changeAuthStatus(false);
    document.cookie = "authentication=; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    this.setUser();
  }

  changeAuthStatus(status: boolean) {
    this.signedInSource.next(status);
    this.authSnapshot = status;
  }
}

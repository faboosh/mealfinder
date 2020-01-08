import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private validSource = new BehaviorSubject(true);
  valid = this.validSource.asObservable();
  userUrl:string = 'http://localhost:4201/user'

  constructor(private http:HttpClient) { }

  validateEmail(email:string) {
    this.http.get<any>(`${this.userUrl}/${email}`).subscribe(valid => {
      this.validSource.next(valid);
    });
  }
}

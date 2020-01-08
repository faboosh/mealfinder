import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string = '';
  password:string = '';
  failed:boolean = false;
  loginSubscription;
  constructor(
    private auth:AuthService,
    private router:Router
  ) { }
  ngOnInit() {}

  login() {
    this.loginSubscription = this.auth.login(this.email, this.password).subscribe(user => {
        user ? this.router.navigateByUrl('/') : this.failed = true;
    })
  }

  ngOnDestroy() {
    if(this.loginSubscription) this.loginSubscription.unsubscribe();
  }
}

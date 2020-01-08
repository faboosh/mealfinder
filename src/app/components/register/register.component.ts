import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  passwordsMatch: boolean = true;
  displayName: string = '';
  email: string = '';
  password: string;
  verifyPassword: string;
  emailValid:boolean = true;
  subscriptions = [];

  constructor(
    private auth: AuthService,
    private user: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.user.valid.subscribe(valid => {
        this.emailValid = valid;
      })
    )
  }

  matchPasswords() {
    this.passwordsMatch = this.password == this.verifyPassword;
  }

  verifyEmail() {
    if(this.email != '') {
      this.user.validateEmail(this.email);
    }
  }

  register() {
    this.subscriptions.push(
      this.auth.register(this.displayName, this.email, this.password).subscribe(
        () => {
          this.router.navigateByUrl('/login')
        }
      )
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }
}

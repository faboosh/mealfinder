import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  passwordsMatch:boolean = true;
  displayName:string = '';
  email:string = '';
  password:string;
  verifyPassword:string;

  constructor(private auth:AuthService) { }

  ngOnInit() {}

  matchPasswords() {
    this.passwordsMatch = this.password == this.verifyPassword;
  }

  register() {
    this.auth.register(this.displayName, this.email, this.password).subscribe(
      () => {
        console.log('registered');
      }
    )
  }
}

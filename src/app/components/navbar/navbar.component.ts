import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  query: string;
  signedIn: boolean = false;
  signedOut: boolean = false;
  profileOpen: boolean = false;
  displayname: string;
  email: string;
  subscriptions = [];
  user;

  constructor(private searchService: SearchService, private auth: AuthService) { }

  ngOnInit() {
    console.log(this.searchService.currentMessage);
    this.searchService.currentMessage.subscribe(query => this.query = query);

    this.subscriptions.push(
      this.auth.user.subscribe(user => {
        console.log(user);
        this.user = user;
      })
    )
    this.subscriptions.push(
      this.auth.signedIn.subscribe(signedIn => {
        this.signedIn = signedIn;
        this.signedOut = false;
        if (signedIn) this.user = JSON.parse(localStorage.getItem('user'));
        if (!this.user) {
          this.logOut();
        }
      })
    )
  }

  search() {
    this.searchService.changeMessage(this.query);
  }

  resetSearch() {
    this.searchService.changeMessage('');
  }

  logOut() {
    this.user = undefined;
    this.signedOut = true;

    this.auth.logout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => {
      item.unsubscribe();
    })
  }
}

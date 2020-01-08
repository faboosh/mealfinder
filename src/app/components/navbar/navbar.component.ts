import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
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
    this.searchService.currentMessage.subscribe(query => this.query = query);

    this.subscriptions.push(
      this.auth.user.subscribe(user => {
        this.user = user;
        console.log(this.signedIn)
      })
    )

    this.auth.signedIn.subscribe(signedIn => {
      this.signedIn = signedIn;
    })
  }

  search() {
    this.searchService.changeMessage(this.query);
  }

  resetSearch() {
    this.searchService.changeMessage('');
  }

  logOut() {
    this.user = {};
    this.signedOut = true;
    this.signedIn = false;
    this.auth.logout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => {
      item.unsubscribe();
    })
  }
}

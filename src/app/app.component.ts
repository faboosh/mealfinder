import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title:string = 'Foodrating dab XD';

  constructor() {
    this.changeTitle('thedab');
  }

  changeTitle(title:string) {
    this.title = title;
  }
}

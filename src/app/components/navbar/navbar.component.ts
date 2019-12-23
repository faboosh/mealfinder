import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  //@Output() searchEvent = new EventEmitter<string>();
  query:string;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    console.log(this.searchService.currentMessage);
    this.searchService.currentMessage.subscribe(query => this.query = query);
  }

  search() {
    this.searchService.changeMessage(this.query);
  }

}

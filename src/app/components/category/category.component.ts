import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() category:string

  constructor(private searchService:SearchService) { }

  ngOnInit() {
    console.log(this.searchService.currentMessage);
  }

  search() {
    this.searchService.changeMessage(this.category);
  }
}

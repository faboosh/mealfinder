import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Review } from '../../modules/Review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() review:Review;
  constructor() { }

  ngOnInit() {

  }

  hasBody() {
    return this.review.body ? this.review.body.length > 0: false;
  }

  isGold(i:number) {
    return i < this.review.rating;
  }

}

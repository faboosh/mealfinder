import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Restaurant } from 'src/app/modules/Restauraunt';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant:Restaurant;
  expanded:boolean = false;
  reviewToggleText:string = 'Show reviews';
  reloadReviewsSubject:Subject<void> = new Subject<void>();
  constructor() { }

  ngOnInit() {

  }

  toggleReviews() {
    this.expanded = !this.expanded;
    console.log(`expanded: ${this.expanded}`);

    this.expanded ?
      this.reviewToggleText = 'Hide reviews':
      this.reviewToggleText = 'Show reviews';
  }

  reloadReviews() {
    this.reloadReviewsSubject.next();
  }

  isGold(i:number) {
    return i < this.restaurant.avgrating;
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Restaurant } from 'src/app/modules/Restauraunt';
import { RestaurantService } from '../../services/restaurant.service';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/modules/User';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {
  @Input() restaurant:Restaurant;
  @Output() newReview = new EventEmitter<any>();
  signInSubscription;
  userSubscription;

  stars = Array(5).fill(false);

  price = Array(3).fill(false);

  review = {
    rating: 0,
    price: 0,
    body: '',
    by: 0,
    for: 0
  }

  user;

  enabled:boolean = false;
  expanded:boolean = false;
  constructor(private auth: AuthService, private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.review.for = this.restaurant.id;

    this.userSubscription = this.auth.user.subscribe(user => {
      this.user = user;
      if(this.user) {
        this.review.by = this.user.id;
        this.enabled = true;
      } else {
        this.enabled = false;
      }
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  setStars(rating) {
    this.stars = this.stars.map(star => star = false);

    for(let i = 0; i < rating; i++) {
      this.stars[i] = true;
    }

    this.review.rating = rating;
  }

  setPrice(price) {
    this.price = this.price.map(price => price = false);

    for(let i = 0; i < price; i++) {
      this.price[i] = true;
    }

    this.review.price = price;
  }

  log() {
    console.log(this.review);
  }

  expand() {
    this.expanded = true;
  }

  collapse() {
    this.expanded = false;
  }

  submit() {
    this.restaurantService.postReview(this.review).subscribe(res => {
      this.newReview.emit();
      this.review.body = '';
      this.stars = Array(5).fill(false);
      this.price = Array(3).fill(false);
      this.collapse();
    });
  }
}

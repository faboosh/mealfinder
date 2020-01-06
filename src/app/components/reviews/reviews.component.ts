import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Review } from '../../modules/Review';
import { Restaurant } from '../../modules/Restauraunt';
import { RestaurantService } from '../../services/restaurant.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  @Input() restaurant: Restaurant;
  @Input() reloadReviews:Observable<void>;
  reloadReviewsSubscription;
  reviews: Review[] = [];
  reviewObservable;
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.loadReviews();
    this.reloadReviewsSubscription = this.reloadReviews.subscribe(() => {
      this.reviewObservable.unsubscribe();
      this.loadReviews();
    })
  }

  loadReviews() {
    this.reviewObservable = this.restaurantService.getReviews(this.restaurant.id).subscribe(reviews => {
      this.reviews = reviews;
      console.log(this.reviews);
    });
  }

}

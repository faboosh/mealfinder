import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/modules/Restauraunt';
import { RestaurantService } from '../../services/restaurant.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})

export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[];
  title: string = '';
  query: string = '';
  subscriptions = [];
  constructor(private restaurantService: RestaurantService, private searchService: SearchService) {

  }

  ngOnInit() {
    this.subscriptions.push(
      this.restaurantService.getRestaurants().subscribe(restaurants => {
        this.restaurants = restaurants;
      })
    );

    this.title = 'Our top 10 picks';

    this.subscriptions.push(
      this.searchService.currentMessage.subscribe(query => {
        console.log(query);
        this.search(query);
      })
    );
  }

  search(query: string) {
    this.query = query;
    if (query != '') {
      this.subscriptions.push(
        this.restaurantService.search(query).subscribe(restaurants => {
          this.restaurants = restaurants;
        })
      );

      this.title = 'Search results for: ' + query;
    } else {
      this.subscriptions.push(
        this.restaurantService.getRestaurants().subscribe(restaurants => {
          this.restaurants = restaurants;
          this.title = 'Our top 10 picks';
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => {
      item.unsubscribe();
    })
  }
}

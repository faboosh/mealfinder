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
  query:string;
  constructor(private restaurantService:RestaurantService, private searchService: SearchService) { 

  }

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(restaurants=> {
      this.restaurants = restaurants;
    });

    this.searchService.currentMessage.subscribe(query => {
      console.log(query);
      this.search(query);
    });
  }

  search(query:string) {
    this.restaurantService.search(query).subscribe(restaurants=> {
      this.restaurants = restaurants;
    });
  } 

}

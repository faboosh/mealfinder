import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/modules/Restauraunt';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[];
  constructor(private restaurantService:RestaurantService) { 

  }

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(restaurants=> {
      this.restaurants = restaurants;
    });
  }

}

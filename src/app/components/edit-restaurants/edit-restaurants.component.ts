import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/modules/Restauraunt';
import { RestaurantService } from '../../services/restaurant.service';
import { User } from 'src/app/modules/User';

@Component({
  selector: 'app-edit-restaurants',
  templateUrl: './edit-restaurants.component.html',
  styleUrls: ['./edit-restaurants.component.scss']
})
export class EditRestaurantsComponent implements OnInit {
  restaurants:Restaurant[];
  categories;
  newRestaurant:object = {
    name: '',
    category: '',
    description: ''
  };

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurantService.getByOwner().subscribe(restaurants=> {
      this.restaurants = restaurants;
      console.log(restaurants);
    });

    this.restaurantService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  log() {
    console.log(this.newRestaurant);
  }

  addRestaurant() {
    $('.modal-backdrop').hide();
    $('.modal').modal('hide');
    this.restaurantService.add(this.newRestaurant).subscribe(restaurant => {
      console.log(restaurant);
      this.restaurants.push(restaurant);
      console.log(this.categories);

      if(!this.categories.some(category => category.category == restaurant.category)) {
        this.categories.push({category: restaurant.category});
      }
    })
  }
}

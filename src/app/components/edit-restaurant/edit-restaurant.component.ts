import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from 'src/app/modules/Restauraunt';
import { RestaurantService } from '../../services/restaurant.service';
import { User } from 'src/app/modules/User';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.scss']
})
export class EditRestaurantComponent implements OnInit {
  @Input() restaurant: Restaurant;
  @Input() categories;
  editRestaurant;
  @Input() user: User;
  reviews = [];
  deleted: boolean = false;
  subscriptions = [];
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.editRestaurant = this.restaurant;
  }

  delete() {
    $('.modal-backdrop').hide();
    $('.modal').modal('hide');
    this.subscriptions.push(
      this.restaurantService.delete(this.restaurant.id).subscribe(res => {
        if (res) {
          this.deleted = true;
        }
      })
    );
  }

  edit() {
    $('.modal-backdrop').hide();
    $('.modal').modal('hide');
    this.subscriptions.push(
      this.restaurantService.edit(this.editRestaurant).subscribe(restaurant => {
        console.log(restaurant);
        this.restaurant = this.editRestaurant
        console.log(this.categories);

        if (!this.categories.some(category => category.category == restaurant.category)) {
          this.categories.push({ category: restaurant.category });
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }
}

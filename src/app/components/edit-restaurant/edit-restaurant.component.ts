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
  @Input() restaurant:Restaurant;
  @Input() user:User;
  reviews = [];
  deleted:boolean = false;
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {

  }

  delete() {
    $('.modal-backdrop').hide();
    $('.modal').modal('hide');
    this.restaurantService.deleteRestaurant(this.restaurant.id).subscribe(res => {
      if(res) {
        this.deleted = true;
      }
    });
  }
}

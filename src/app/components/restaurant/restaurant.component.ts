import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from 'src/app/modules/Restauraunt';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant:Restaurant;

  constructor() { }

  ngOnInit() {
    //this.stars = Array(this.restaurant.avgRating);
  }

  /*stars() {
    return Array(this.restaurant.avgRating);
  }*/
}

import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent implements OnInit {
  categories = [];
  query:string;

  constructor(private restaurantService:RestaurantService) {}

  ngOnInit() {
    this.restaurantService.getCategories().subscribe(categories=> {
      this.categories = categories;
    });
  } 
}

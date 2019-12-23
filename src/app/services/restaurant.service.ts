import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Restaurant } from '../modules/Restauraunt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {
  restaurantUrl:string = 'http://localhost:3000/restaurants';

  constructor(private http:HttpClient) { }

  getRestaurants():Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.restaurantUrl);
  }

  search(query:string):Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.restaurantUrl}/${query}`);
  }
}

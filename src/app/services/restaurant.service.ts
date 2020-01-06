import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../modules/Restauraunt';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {
  restaurantUrl:string = 'http://localhost:4201/restaurants';
  private restaurantAddedSource = new Subject<any>();
  restaurantAdded$ = this.restaurantAddedSource.asObservable();

  constructor(private http:HttpClient) { }

  search(query:string):Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.restaurantUrl}/search/${query}`);
  }

  getRestaurants():Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.restaurantUrl);
  }

  getCategories():Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.restaurantUrl}/categories`);
  }

  getByOwner(id:number):Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.restaurantUrl}/owner/${id}`);
  }

  deleteRestaurant(id:number):Observable<Restaurant[]> {
    return this.http.delete<Restaurant[]>(`${this.restaurantUrl}/${id}`);
  }

  edit(id:number):Observable<Restaurant[]> {
    return this.http.delete<Restaurant[]>(`${this.restaurantUrl}/${id}`);
  }

  add(restaurant:object):Observable<any> {
    return this.http.post<any>(this.restaurantUrl, restaurant);
  }

  postReview(review):Observable<any> {
    return this.http.post<any>(`${this.restaurantUrl}/reviews`, review);
  }

  getReviews(id:number):Observable<any> {
    return this.http.get<any>(`${this.restaurantUrl}/reviews/${id}`);    
  }
 }

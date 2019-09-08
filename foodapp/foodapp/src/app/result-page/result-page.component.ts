import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { GetRestaurantInfoService } from '../service/get-restaurant-info.service';

interface Restaurant {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  cuisines: string;
  highlights: string;
  timings: string;
  price_range: string;
  aggregate_rating: number;
  photo_url:string;
  reviews: []
}

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {

  constructor(
    private getRestaurantInfoService: GetRestaurantInfoService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  res_id: number;

  cuisine: string = "";
  
  //default display data
  restaurant: Restaurant = {
    name: "",
    address: "",
    latitude: 0,
    longitude: 0,
    cuisines: "",
    highlights: "",
    timings: "",
    price_range: "",
    aggregate_rating: 0,
    photo_url: "",
    reviews: [],
  };
  responseReceived = false;
  
  ngOnInit() {
    this.res_id = +this.route.snapshot.paramMap.get('restaurantid');
    console.log(this.res_id);
    this.getRestaurantInfo(this.res_id);
  }

  getRestaurantInfo(res_id) {
    return this.getRestaurantInfoService.getRestaurantInfo(res_id).subscribe(response => this.parseInfoResults(response));
  }

  parseInfoResults(response) {
    console.log(response);
    this.restaurant.name = response["name"];
    this.restaurant.address = response["location"]["address"];
    this.restaurant.cuisines = response["cuisines"];
    this.restaurant.price_range = "$".repeat(response["price_range"]);
    this.restaurant.aggregate_rating = response["user_rating"]["aggregate_rating"];
    
    //get photos
    this.restaurant.photo_url = response["featured_image"];
    
    //get reviews
    this.restaurant.reviews = response["all_reviews"]["reviews"]

    // this.restaurant.review_name = res_reviews[0]["review"]["user"]["name"];
    // this.restaurant.review_text = response["all_reviews"]["reviews"][0]["review"]["review_text"];
    // this.restaurant.review_rating = response["all_reviews"]["reviews"][0]["review"]["rating"];
    
    this.responseReceived = true;
    console.log(this.restaurant.name);
  }

}

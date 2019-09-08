import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GetCityIdService } from '../service/get-city-id.service';
import * as $ from 'jquery';

import { GetRestaurantsService } from '../service/get-restaurants.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private getCityIdService: GetCityIdService,
    private getRestaurantsService: GetRestaurantsService,
    private route: ActivatedRoute,
    private router: Router) { }

  location:string;
  cityId:number;
  latitude:number;
  longitude:number;
  restaurantId:number;

  locationValid:boolean = false;
  
  ngOnInit() {
  }

  testLocation(value) {
    console.log(value);
  }

  getCityId(location) {
    this.location = location;
    console.log(this.location);
    $('#start').removeClass('btn-disabled')
    $('#start').addClass('btn-enabled')
    $('#lucky').removeClass('btn-disabled')
    $('#lucky').addClass('btn-enabled')

    return this.getCityIdService.getCityId(this.location).subscribe(response => this.parseCityIdResponse(response));
  }

  parseCityIdResponse(response) {
    console.log(response);
    if (response["location_suggestions"].length == 0) {
      console.log('invalid city');
    } else {
      this.cityId = response["location_suggestions"][0]["entity_id"];
      this.latitude = response["location_suggestions"][0]["latitude"];
      this.longitude = response["location_suggestions"][0]["longitude"];
      this.locationValid = true;
      console.log(this.cityId);
      console.log(this.latitude);
      console.log(this.longitude);
      
      return response["location_suggestions"][0]["name"];
    }   
  }

  currentPosition() {
    var self = this;
    if (navigator.geolocation) {
      $("#textLocationInput").val("");
      $("#textLocationInput").prop("disabled", true);
      $("#locationButton").addClass('btn-disabled2');

      navigator.geolocation.getCurrentPosition(function (position) {

        self.latitude = position.coords.latitude; 
        self.longitude = position.coords.longitude;

        console.log("Hello there")
        console.log(self.latitude);
        console.log(self.longitude);
        
        $('#start').removeClass('btn-disabled')
        $('#start').addClass('btn-enabled')
        $('#lucky').removeClass('btn-disabled')
        $('#lucky').addClass('btn-enabled')
      
      }); 
    } else {
      let locationInput = <HTMLInputElement>document.getElementById("textLocationInput");
      this.getCityId(locationInput.value);
    }
  }

  getRestaurants() {
    console.log(this.latitude);
    return this.getRestaurantsService.getRestaurants('', this.latitude, this.longitude)
      .subscribe(response => this.randRestaurant(response, this.latitude, this.longitude));

  }

  distanceHandler(lat1, lon1, lat2, lon2) {
    
    var R = 6371000; // metres
    var psi1 = lat1 * Math.PI/180;
    var psi2 = lat2* Math.PI/180;
    var dPsi = (lat2-lat1)* Math.PI/180;
    var dLambda = (lon2-lon1)* Math.PI/180;

    var a = Math.sin(dPsi/2) * Math.sin(dPsi/2) +
            Math.cos(psi1) * Math.cos(psi2) *
            Math.sin(dLambda/2) * Math.sin(dLambda/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = (R * c)/1609.344;
    if(d > 25) {
      return 0
    } else if(d < 1) {
      return 4;
    } else {
      let val = 4-(d-1)/6;
      return val;
    }
  }

  randRestaurant(response, lat, long) {
    let restList = response.restaurants;
    
    var rand_num = Math.floor(Math.random() * restList.length);
    var rand_restaurant = restList[rand_num];
    console.log(rand_restaurant);
    this.restaurantId = rand_restaurant.restaurant.id;
    console.log(this.restaurantId);

    this.router.navigate(['/result', this.restaurantId]);
    return rand_restaurant;
  }
  

}
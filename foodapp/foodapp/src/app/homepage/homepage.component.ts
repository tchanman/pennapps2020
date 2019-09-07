import { Component, OnInit } from '@angular/core';
import { GetCityIdService } from '../service/get-city-id.service';
import { $ } from 'jquery';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private getCityIdService: GetCityIdService) { }

  location:string;
  cityId:number;
  latitude:number;
  longitude:number;

  locationValid:boolean = false;
  
  ngOnInit() {
  }

  testLocation(value) {
    console.log(value);
  }

  getCityId(location) {
    this.location = location;
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
    }
    
  }

}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { GetCuisinesService } from '../service/get-cuisines.service';
import { GetRestaurantsService } from '../service/get-restaurants.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent implements OnInit {

  cityId:number;
  latitude:number;
  longitude:number;
  
  question:string = "How do you feel?";

  answers:string[] = ["good", "ok", "eh", "bad"];

  category:string;
  cuisine:string;

  constructor(
    private getCuisinesService: GetCuisinesService,
    private getRestaurantsService: GetRestaurantsService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.cityId = +this.route.snapshot.paramMap.get('id');
    this.latitude = +this.route.snapshot.paramMap.get('lat');
    this.longitude = +this.route.snapshot.paramMap.get('long');
  }

  printLocation() {
    console.log(this.cityId);
    console.log(this.latitude);
    console.log(this.longitude);
    //console.log(this.getCuisines('Asian'));
  }

  //after category decided, get cuisines using getCuisinesService
  decideCategory(category) {
    this.category = category;
  }

  getCuisines(category) {
    return this.getCuisinesService.getCuisines(category).subscribe(cuisines => console.log(cuisines));
  }
  
  //after cuisine decided, get restaurants in area using getRestaurantsService
  decideCuisine(cuisine) {
    this.cuisine = cuisine;
  }

  getRestaurants(cuisine) {
    this.cuisine = cuisine;
    return this.getRestaurantsService.getRestaurants(this.cuisine, this.latitude, this.longitude).subscribe(response => console.log(response));
  }

}

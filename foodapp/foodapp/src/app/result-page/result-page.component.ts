import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { GetRestaurantInfoService } from '../service/get-restaurant-info.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {

  constructor(private getRestaurantInfoService: GetRestaurantInfoService, private route: ActivatedRoute) { }

  res_id: number;
  
  ngOnInit() {
    this.res_id = +this.route.snapshot.paramMap.get('restaurantid');
  }

  getRestaurantInfo() {
    return this.getRestaurantInfoService.getRestaurantInfo(16782899).subscribe(response => console.log(response));
  }

}

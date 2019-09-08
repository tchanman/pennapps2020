import { Component, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { GetCuisinesService } from '../service/get-cuisines.service';
import { GetRestaurantsService } from '../service/get-restaurants.service';

const questions:string[] = [
  "How spicy you feeling?", 
  "Which flavor?", 
  "Hot, Cold, Goldilocks",
  "Which texture?",
  "How much oil?",
  "How exotic?"
];

const answers:string[][] = [
  ["Let it burn", "Pretty spicy", "Mild spice", "No spice at all"], 
  ["Sweet", "Savory", "Sour", "Salty"], 
  ['Hot', 'Cold', 'Just Right'],
  ["Chewy", "Smooth", "Crispy"],
  ["Greasy is just fine", "Light on Oil", "Any amount is ok"],
  ["Exotic", "Normal", "I'd eat anything"]
];

var totalpointcounter = 0
const totalpoints:number[] = [4,6,3,3,3,3]

const secondpointvals:number[][] = [
  [1.5,2,1,2.5,0,0,0.5,1.5,2,2.5],
  [2.5,2.5,2.5,2,1,1,1.5,2.5,2,2],
  [1,1.5,2.5,1,2.5,2.5,2.5,1.5,1,1.5],
  [1,0,0,0.5,2.5,2.5,1.5,0.5,1,0]
]

const randompointvals:number[][][] = [
  [
    [2,0,0.5,1.5,0,0,0,1,0,1.5], 
    [1.5,0,0.5,0.5,0,0,0.5,1,0,2], 
    [0,2,1,0.5,0,0,1.5,1,2,0.5], 
    [0.5,2,2,1.5,2,2,2,1,2,0]
  ],
  [
    [0.5,1.5,1.5,0.5,2.5,3,2,2,1.5,0], 
    [2.5,1.5,0.5,2.5,0,0,1.5,1,1,2.5], 
    [1,0.5,2,0.5,1.5,0.5,0.5,0.5,0.5,1.5], 
    [2,2.5,2,2.5,1,1.5,2,2.5,2,2]
  ],
  [
    [2,2.5,0,1,2,0.5,2,0.5,1.5,2],
    [1,0,2,1,1,1.5,0.5,1.5,0.5,0],
    [0,0.5,1,1,0,1,0.5,1,1,1]
  ],
  [
    [1,1,0,1,0,1,1,1.5,0.5,1],
    [1,0,2,0,2,2,1,1.5,1.5,0],
    [1,2,1,2,0,0,1,0,1,2]
  ],
  [
    [0.5,2.5,0,2,0,0,1,0.5,0,2],
    [1.5,0,2.5,0.5,2.5,1.5,1,1.5,2,0.5],
    [1,0.5,0.5,0.5,0.5,1.5,1,0,1,0.5]
  ],
  [
    [2,0,1,0,1.5,1,0,2,0.5,2],
    [0.5,2,1,2,1,1.5,1.5,0,1.5,0.5],
    [0.5,1,1,1,0.5,0.5,1.5,1,1,0.5]
  ]
  
];

const cuisines = {
  "Asian": [
    {"name": "Chinese", "id": 25},
    {"name": "Japanese", "id": 60},
    {"name": "Korean", "id": 67},
    {"name": "Thai", "id": 95},
    {"name": "Indian", "id": 148}
  ],
  "Quick Bites": [  
    {"name": "Bar Food", "id": 227},
    {"name": "Fast Food", "id": 40},
    {"name": "Pizza", "id": 82},
  ],
  "Healthy": [
    {"name": "Healthy Food", "id": 143},  
    {"name": "Salad", "id": 998},
    {"name": "Vegetarian", "id": 308}
  ],
  "Western": [
    {"name": "American", "id": 1},
    {"name": "Diner", "id": 541},
    {"name": "Southern", "id": 471}
  ],
  "Thirsty": [
    {"name": "Coffee and Tea", "id": 161},  
    {"name": "Bubble Tea", "id": 247},
    {"name": "Cafe", "id": 30}
  ],
  "Sweet": [
    {"name": "Desserts", "id": 100},  
    {"name": "Donuts", "id": 959},
    {"name": "Ice Cream", "id": 223}
  ],
  "Breakfast": [
    {"name": "Bakery", "id": 5},
    {"name": "Breakfast", "id": 182}
  ],
  "Seafood": [
    {"name": "Seafood", "id": 83}
  ],
  "Italian": [
    {"name": "Italian", "id": 55}
  ],
  "Mexican": [
    {"name": "Mexican", "id": 73}
  ]
}

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent implements OnInit {
  cuisineId:number[] = [];
  cityId:number;
  latitude:number;
  longitude:number;

  secondQuesAns:boolean = false;

  usedIndices = [];

  curQues = "How are you feeling today?";
  
  secondQues = "How hungry are you?";

  curAns = ["Happy", "Normal", "Looking for Adventure", "Tired"];

  secondAns = ["I'm starving", "I want a regular meal", "Something light please", "Sweet n Small"];

  curIndex = -2;

  firstRes = 0;

  category:string;
  cuisine:string;
  restaurants:string[];

  restaurantId:number;

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

  cuisinepoints: { [key: string]: number; } =
  {"Asian": 0, 
    "Quick Bites": 0, 
    "Healthy": 0, 
    "Western": 0, 
    "Thirsty": 0,
    "Breakfast": 0, 
    "Seafood":0, 
    "Italian": 0,
    "Mexican": 0
  };
  
  
  addPoints (indexAns) {
    console.log(this.curIndex);
    if (this.curIndex == -2) {
      this.firstRes = indexAns;
    }
    
    else if (this.curIndex == -1) {
      let tempIndex = 0;

      for (let category in this.cuisinepoints){
        this.cuisinepoints[category] += secondpointvals[indexAns][tempIndex];
        tempIndex += 1;
      }
      console.log(this.cuisinepoints);
    }
    else {
      console.log(randompointvals[this.curIndex][indexAns]);
      let tempIndex = 0;

      for (let category in this.cuisinepoints){
        this.cuisinepoints[category] += randompointvals[this.curIndex][indexAns][tempIndex];
        tempIndex += 1;
      }

      console.log(this.cuisinepoints);
    }    
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
  
  rateRestaurants(response, latOrigin, lonOrigin) {
    let ratings = [];
    for(let rest of response) {
      let restaurant = rest.restaurant
      let rate = this.distanceHandler(latOrigin,lonOrigin, restaurant.location.latitude, restaurant.location.longitude) +
                +(restaurant.user_rating.aggregate_rating) + +(restaurant.price_range);
      console.log(this.distanceHandler(latOrigin,lonOrigin, restaurant.location.latitude, restaurant.location.longitude)); // +
      ratings.push([restaurant.id, rate]);
    }
    //console.log(ratings);
    
    var max = 0;
    var best_restaurant = [];
    for(let restList of ratings) {
      if(restList[1] >= max) {
        max = restList[1];
        best_restaurant = restList;
      }
    }
    console.log(best_restaurant);
    this.restaurantId = best_restaurant[0];

    this.router.navigate(['/result', this.restaurantId]);
    return best_restaurant;
  }

  edit () {
    if (this.curIndex == -2){
      this.curQues = this.secondQues;
      this.curAns = this.secondAns;
      this.curIndex += 1;
    } else if (this.usedIndices.length > 3) {
      this.calculateRestaurants();
      console.log("elseif block");
      console.log(this.cuisineId);
      this.getRestaurants(this.cuisineId);
    } else {
      let quesNum = Math.floor(Math.random() * 6); //length here
      while (this.usedIndices.indexOf(quesNum) > -1) {
        quesNum = Math.floor(Math.random() * 6);
      }
      this.curQues = questions[quesNum];
      this.curAns = answers[quesNum];
      this.curIndex = quesNum;
      this.usedIndices.push(quesNum);
      totalpointcounter += totalpoints[quesNum]
      console.log(this.usedIndices);
    }
  };


calculateRestaurants () {
  let maxValue = 0;
  let chosenCategory = "";
  for (let category in this.cuisinepoints){
    if (this.cuisinepoints[category] > maxValue){
      maxValue = this.cuisinepoints[category];
      chosenCategory = category;
    }
  }
  console.log(chosenCategory);
  this.getCuisines(chosenCategory);
  // for (let cuisine in this.getCuisines(chosenCategory)){
  //   console.log(this.getCuisines(chosenCategory)[cuisine]);
  //   console.log(this.getRestaurants(cuisine["id"]));
  // }
}
  
    
  

  printLocation() {
    console.log(this.cityId);
    console.log(this.latitude);
    console.log(this.longitude);
    //console.log(this.getCuisines('Asian'));
  }

  getCuisines(category) {
    this.category = category;
    for (let cuisine of cuisines[this.category]){
      console.log(cuisine);
      this.cuisineId.push(cuisine.id);
    }
  }
  //after category decided, get cuisines using getCuisinesService
  //param category is string name of category
  // getCuisines(category) {
  //   this.category = category;
  //   return this.getCuisinesService.getCuisines(this.category).subscribe(response => this.parseCuisines(response));
  // }

  parseCuisines(response) {
    console.log(response[0]);
    console.log(response.length);
    if (!response) {
      console.log('invalid cuisine');
    } else {
      for (var i = 0; i < response.length; i++) {
        console.log(response[i]["id"]);
        this.cuisineId.push(response[i]["id"]);
      }
      console.log(this.cuisineId);
    }
  }
  
  //after cuisine decided, get restaurants in area using getRestaurantsService
  //parameter cuisine is list of cuisine id ex: [60] or [22, 30]
  getRestaurants(cuisine) {
    
    return this.getRestaurantsService.getRestaurants(cuisine, this.latitude, this.longitude)
    .subscribe(response => this.rateRestaurants(response["restaurants"], this.latitude, this.longitude));
  }

  routeHandler() {
    this.router.navigate(['/result', this.restaurantId]);
  }
}

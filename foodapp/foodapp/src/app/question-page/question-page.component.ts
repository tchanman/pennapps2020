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
  /*cityId:number;
  latitude:number;
  longitude:number;*/

  secondQuesAns:boolean = false;
  
  curQues = "What is your mood?";
  curAns = ['good', 'bad'];

  usedIndices = [];
  
  questions:string[] = [
    "How spicy you feeling?", 
    "Which flavor?", 
    "Hot, Cold, Goldilocks",
    "Which texture?",
    "How much oil?",
    "How exotic?"
  ];

  answers:string[][] = [
    ["Let it burn", "Pretty spicy", "Mild spice", "No spice at all"], 
    ["Sweet", "Savory", "Sour", "Salty"], 
    ['Hot', 'Cold', 'Just Right'],
    ["Chewy", "Smooth", "Crispy"],
    ["Greasy is just fine", "Light on Oil", "Any amount is ok"],
    ["Exotic", "Normal", "I'd eat anything"]
  ];

  pointvals:number[][][] = [
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

    
    
  ]

  cuisinepoints: { [key: string]: number; } =
  {"Asian": 0, 
    "Fast Food": 0, 
    "Healthy": 0, 
    "Western": 0, 
    "Thirsty": 0, 
    "Sweet":0, 
    "Breakfast":0, 
    "Seafood":0, 
    "Italian": 0,
    "Mexican": 0
  };
  
  addPoints () {
    //this.cuisinepoints +=
  };      

  edit () {
    if (!this.secondQuesAns) {
      this.curQues = "second ques";
      this.curAns = ['a', 'b'];
      this.secondQuesAns = true;
    }
    else {
      let index = Math.floor(Math.random() * 5); //length here
      while (index in this.usedIndices) {
        index = Math.floor(Math.random() * 5);
      }
      this.curQues = this.questions[index];
      this.curAns = this.answers[index];
      this.usedIndices.push(index);
    }
  };
  
    /*
  category:string;
  cuisine:string;
  restaurants:string[];

  restaurantId:number = 2;

  constructor(
    private getCuisinesService: GetCuisinesService,
    private getRestaurantsService: GetRestaurantsService,
    private route: ActivatedRoute,
    private router: Router
    ) { }
*/
  ngOnInit() {
    /*
    this.cityId = +this.route.snapshot.paramMap.get('id');
    this.latitude = +this.route.snapshot.paramMap.get('lat');
    this.longitude = +this.route.snapshot.paramMap.get('long');
    */
  }
/*
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
  */

}

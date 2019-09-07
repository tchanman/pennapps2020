import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const cuisines = {
  "Asian": [
    {"name": "Chinese", "id": 25},
    {"name": "Japanese", "id": 60},
    {"name": "Korean", "id": 67},
    {"name": "Thai", "id": 95},
    {"name": "Indian", "id": 148}
  ],
  "Quick Bites": [
    {"name": "Bakery", "id": 5},  
    {"name": "Bar Food", "id": 227},
    {"name": "Fast Food", "id": 40},
    {"name": "Pizza", "id": 82},
  ],
  "Healthy": [
    {"name": "Healthy Food", "id": 143  },  
    {"name": "Salad", "id": 998},
    {"name": "Vegetarian", "id": 308}
  ],
  "Western": [
    {"name": "American", "id": 1},
    {"name": "Diner", "id": 541},
    {"name": "Italian", "id": 55},
    {"name": "Mexican", "id": 73},
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
    {"name": "Breakfast", "id": 182}
  ],
  "Seafood": [
    {"name": "Seafood", "id": 83}
  ]
}

@Injectable({
  providedIn: 'root'
})
export class GetCuisinesService {

  constructor() { }

  getCuisines(category): Observable<string[]> {
    return of(cuisines[category]);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'user-key': 'c7d7118eb28d9a2d839939a5466e35ec'
  })
};

let firstTime = false;

@Injectable({
  providedIn: 'root'
})
export class GetRestaurantsService {

  constructor(private http: HttpClient) { }

  apiUrl = "https://developers.zomato.com/api/v2.1/search?";

  getRestaurants(cuisine, lat, long){
    console.log(cuisine);

    let tempUrl = this.apiUrl;
    //add latitude param
    tempUrl = tempUrl + "lat=" + lat + "&";
    //add longitude param
    tempUrl = tempUrl + "lon=" + long + "&";
    //add radius param, hardcoded as 30 miles
    tempUrl = tempUrl + "radius=42480";
    //add latitude param
    if (cuisine != ''){
      tempUrl = '&' + tempUrl + "&cuisines=" + this.stringifyList(cuisine);
    }

    if(tempUrl[0] === "&") {
      tempUrl = tempUrl.substr(1, tempUrl.length);
    }
    console.log("this is tempurl")
    console.log(tempUrl)
    return this.http.get(tempUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  private stringifyList(ls) {
    let total = "";
    for(let item of ls) {
      total += item + "%2C"
    }
    total = total.substr(0, total.length-3)
    return total
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

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

@Injectable({
  providedIn: 'root'
})
export class GetCityIdService {

  constructor(private http: HttpClient) { }

  apiUrl = "https://developers.zomato.com/api/v2.1/locations?query=";

  getCityId(cityName){
    this.apiUrl = this.apiUrl + cityName;
    console.log(this.apiUrl)
    return this.http.get(this.apiUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
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


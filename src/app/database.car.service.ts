import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './model/car';

@Injectable({
  providedIn: 'root'
})
export class DatabaseCarService {

  constructor(private http : HttpClient) { }

  @Output() fire: EventEmitter<any> = new EventEmitter();

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  baseURL = "https://tc2-trabalho-final-api.herokuapp.com/api/";

  getAllCar(user) : Observable<Car[]> {
    return this.http.get<Car[]>(this.baseURL + "book/all" + user._id)
  }

  addCar(car: Car): Observable<any> {
    return this.http.post<Car>(this.baseURL + 'book/', car)
  }

  deleteCar(id: string) : Observable<any> {
    const url = `${this.baseURL}/book/${id}`
    return this.http.delete<Car>(url)
  }

  updateCar(car: Car) : Observable<any> {
    const url = `${this.baseURL}/book/${car._id}`
    return this.http.put<Car>(url, car)
  }
}

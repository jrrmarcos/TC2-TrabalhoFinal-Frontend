import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Car } from '../model/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) { }

  @Output() fire: EventEmitter<any> = new EventEmitter();

  private getOptions() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return httpOptions
  }

  baseURL = "https://tc2-trabalho-final-api.herokuapp.com/api/";

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      //panelClass: isError ? ['msg-error'] : ['msg-success']
      panelClass: isError ? ['failClass'] : ['successClass']
    })
  }

  tratamentodeErros(e: any) {
    this.showMessage('Ocorreu um erro!', true)
    this.router.navigate(['/home'])
    return EMPTY
  }

  getAllCar(user): Observable<Car[]> {
    return this.http.get<Car[]>(this.baseURL + "book/all" + user._id)
  }

  getById(id: string): Observable<Car> {
    const url = `${this.baseURL}/${id}`
    return this.http.get<Car>(url)
  }

  addCar(car: Car): Observable<any> {
    return this.http.post<Car>(this.baseURL + 'book/', car)
  }

  deleteCar(id: string): Observable<any> {
    const url = `${this.baseURL}/book/${id}`
    return this.http.delete<Car>(url)
  }

  updateCar(car: Car): Observable<any> {
    const url = `${this.baseURL}/book/${car._id}`
    return this.http.put<Car>(url, car)
  }
}

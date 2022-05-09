import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { Brand } from '../model/brand.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

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

  getAllBrand(user): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseURL + "author/all/" + user._id);
  }

  getById(id: string): Observable<Brand> {
    const url = `${this.baseURL}/${id}`
    return this.http.get<Brand>(url)
  }

  addBrand(brand: Brand): Observable<any> {
    return this.http.post<Brand>(this.baseURL + 'author/', brand, { observe: "response" });
  }

  deleteBrand(id: string): Observable<any> {
    const url = `${this.baseURL}/author/${id}`
    return this.http.delete<Brand>(url, { observe: "response" })
  }

  updateBrand(brand: Brand): Observable<any> {
    const url = `${this.baseURL}/author/${brand._id}`
    return this.http.put(url, brand, { observe: "response" })
  }
}

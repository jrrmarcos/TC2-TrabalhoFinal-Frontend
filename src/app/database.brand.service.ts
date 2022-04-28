import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Brand } from './model/brand';

@Injectable({
  providedIn: 'root'
})
export class DatabaseBrandService {

  constructor(private http: HttpClient) { }

  @Output() fire: EventEmitter<any> = new EventEmitter();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  baseURL = "https://tc2-trabalho-final-api.herokuapp.com/api/";

  getAllBrand(user) : Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseURL + "author/all/" + user._id);
  }

  addBrand(brand: Brand): Observable<any> {
    return this.http.post<Brand>(this.baseURL + 'author/', brand, { observe: "response" });
  }

  deleteBrand(id: string) : Observable<any> {
    const url = `${this.baseURL}/author/${id}`
    return this.http.delete<Brand>(url, { observe: "response"})
  }

  updateBrand(brand: Brand) : Observable<any> {
    const url = `${this.baseURL}/author/${brand._id}`
    return this.http.put(url, brand, { observe: "response"})
  }
}

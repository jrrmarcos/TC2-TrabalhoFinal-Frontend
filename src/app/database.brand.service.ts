import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';

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

  getAllAuthor(user: { _id: string; }) : Observable<any> {
    return this.http.get(this.baseURL + "author/all/" + user._id);
  }

  addBrand(brand: any): Observable<any> {
    return this.http.post(this.baseURL + 'author/', brand, { observe: "response" });
  }

  deleteAuthor(id: string) : Observable<any> {
    return this.http.delete(this.baseURL + 'author/' + id, { observe: "response"})
  }

  updateAuthor(brand: { _id: string; }) : Observable<any> {
    return this.http.put(this.baseURL + 'author/' + brand._id, brand, { observe: "response"})
  }
}

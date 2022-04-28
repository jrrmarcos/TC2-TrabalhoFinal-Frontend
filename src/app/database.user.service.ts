import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseUserService {

  constructor(private http : HttpClient) { }

  @Output() fire: EventEmitter<any> = new EventEmitter();

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  baseURL = "https://tc2-trabalho-final-api.herokuapp.com/api/";
  
  addUser(user): Observable<any> {
    return this.http.post(this.baseURL + 'user/', user, { observe: "response" });
  }

  loginUser(user): Observable<any> {
    return this.http.post(this.baseURL + 'user/login/', user, { observe: "response" });
  }

  deleteUser(id) : Observable<any> {
    return this.http.delete(this.baseURL + 'user/' + id, { observe: "response"})
  }

  updateUser(user) : Observable<any> {
    return this.http.put(this.baseURL + 'user/' + user._id, user, { observe: "response"})
  }
  
}

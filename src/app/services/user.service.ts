import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  snackBar: any;

  constructor(private http : HttpClient,
              private router: Router) { }

  @Output() fire: EventEmitter<any> = new EventEmitter();

  private getOptions() {
    let httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type' : 'application/json'
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
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }
  
  tratamentodeErros(e: any){
    this.showMessage('Ocorreu um erro!', true)
    this.router.navigate(['/login'])
    return EMPTY
  }

  addUser(user): Observable<any> {
    return this.http.post(this.baseURL + 'user/', user, { observe: "response" }).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }

  loginUser(user): Observable<any> {
    return this.http.post(this.baseURL + 'user/login/', user, { observe: "response" }).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }

  deleteUser(id) : Observable<any> {
    return this.http.delete(this.baseURL + 'user/' + id, { observe: "response"}).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }

  updateUser(user) : Observable<any> {
    return this.http.put(this.baseURL + 'user/' + user._id, user, { observe: "response"}).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }
  
}

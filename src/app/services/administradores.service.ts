import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Admin } from '../model/admin.model';
@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {
  constructor(private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) { }

  baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/administradores.php";

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['failClass'] : ['successClass']
    })
  }

  private getOptions(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }
    return httpOptions;
  }

  tratamentodeErros(e: any) {
    this.showMessage('Ocorreu um erro!', true)
    this.router.navigate(['/login'])
    return EMPTY
  }

  addAdmin(admin: Admin): Observable<any> {
    //body da request
    let body = new HttpParams();
    body = body.set('login', admin.login)
    body = body.set('senha', admin.senha)

    return this.http.put(this.baseURL, body, this.getOptions()).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }

  loginAdmin(admin: Admin): Observable<any> {
    //body da request
    let body = new HttpParams();
    body = body.set('login', admin.login)
    body = body.set('senha', admin.senha)

    return this.http.post(this.baseURL, body, { observe: "response" }).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }

}

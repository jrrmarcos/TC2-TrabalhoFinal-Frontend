import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Consulta } from '../model/consulta.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) { }

  
  baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/consultas.php";

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['failClass'] : ['successClass']
    })
  }

  private getOptions() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
      })
    }
    return httpOptions;
  }

  tratamentodeErros(e: any) {
    this.showMessage('Ocorreu um erro!', true)
    this.router.navigate(['/login'])
    return EMPTY
  }

  getAllConsultas(): Observable<any> {
    return this.http.get(this.baseURL, this.getOptions()).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }

  readById(id: string) {
    let consultas: Consulta[]
    this.getAllConsultas().subscribe(consultas => {
      consultas = consultas.map(function (e) {
        if (e.id.toString() === id) return e
      })
    })
  }

  deleteConsulta(consulta: Consulta): Observable<any> {
    return this.http.delete(this.baseURL + `?id=${consulta.id}`, this.getOptions()).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }

  addConsulta(consulta: Consulta): Observable<any> {
    //body da request
    let body = new HttpParams();
    body = body.set('idPaciente', consulta.idPaciente)
    body = body.set('idMedico', consulta.idMedico)
    body = body.set('data', consulta.data + ' ' + consulta.time)
    
    return this.http.post(this.baseURL, body, this.getOptions()).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }

  updateConsulta(consulta: Consulta): Observable<any> {
    //body da request
    let body = new HttpParams();
    body = body.set('id', consulta.id)
    body = body.set('idPaciente', consulta.idPaciente)
    body = body.set('idMedico', consulta.idMedico)
    body = body.set('data', consulta.data + ' ' + consulta.time)
    
    return this.http.put(this.baseURL, body, this.getOptions()).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }

}

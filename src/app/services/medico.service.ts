import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Medico } from '../model/medico.model';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  constructor(private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) { }

  baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/medicos.php";

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

  getAllMedicos(): Observable<any> {
    return this.http.get(this.baseURL, this.getOptions()).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }

  readById(id: string){
    let medicos: Medico[]
    this.getAllMedicos().subscribe(medicos => {
      medicos = medicos.map(function (e) {
        if (e.id.toString() === id) return e
      })
    })
  }

  deleteMedico(medico: Medico): Observable<any>  {
    return this.http.delete(this.baseURL + `?id=${medico.id}`, this.getOptions()).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }

  addMedico(medico: Medico): Observable<any> {
    //body da request
    let body = new HttpParams();
    body = body.set('nome', medico.nome)
    body = body.set('idEspecialidade', medico.idEspecialidade)

    return this.http.post(this.baseURL, body, this.getOptions()).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }

  getEspecialidades(): Observable<any> {
    return this.http.get("https://tiagoifsp.ddns.net/clinicaMedicaJWT/especialidades.php", this.getOptions()).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }

}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Paciente } from '../model/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) { }

  baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/pacientes.php";

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

  getAllPacientes(): Observable<any> {
    return this.http.get(this.baseURL, this.getOptions()).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }

  readById(id: string) {
    let medicos: Paciente[]
    this.getAllPacientes().subscribe(medicos => {
      medicos = medicos.map(function (e) {
        if (e.id.toString() === id) return e
      })
    })
  }

  deletePaciente(paciente: Paciente): Observable<any> {
    return this.http.delete(this.baseURL + `?id=${paciente.id}`, this.getOptions()).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }

  addPaciente(paciente: Paciente): Observable<any> {
    //body da request
    let body = new HttpParams();
    body = body.set('nome', paciente.nome)
    body = body.set('dataNascimento', String(paciente.dataNascimento))

    return this.http.post(this.baseURL, body, this.getOptions()).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }

  updateMedico(paciente: Paciente): Observable<any> {
    //body da request
    let body = new HttpParams();
    body = body.set('id', paciente.id)
    body = body.set('nome', paciente.nome)
    body = body.set('dataNascimento', String(paciente.dataNascimento))

    return this.http.put(this.baseURL, body, this.getOptions()).pipe(
      map(obj => obj),
      catchError(e => this.tratamentodeErros(e))
    )
  }
}

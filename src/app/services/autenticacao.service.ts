import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private router: Router,
    private snackBar: MatSnackBar) { }


  dataExpiracao() {
    const currentDate = Date.now()
    const minutesToAdd = 5
    const futureDate = (currentDate + (minutesToAdd * 60000))
    return futureDate
  }

  autenticado() {
    if (Date.now() < Number(sessionStorage.getItem('expiry'))) {
      return true
    } else if (sessionStorage.getItem('expiry') === null) {
      this.router.navigate(['/login'])
      return false
    } else {
      sessionStorage.clear()
      this.showMessage('Sessão expirada!', true)
      this.router.navigate(['/login'])
      return false
    }
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['failClass'] : ['successClass']
    })
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdministradoresService } from '../services/administradores.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuard implements CanActivate {
  constructor(private router: Router,
            private adminService: AdministradoresService) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const token = sessionStorage.getItem('token')
    const expiry = sessionStorage.getItem('expiry')

    if (((token !== 'null')) && (expiry !== 'null')) {
      return true
    } else {
      this.adminService.showMessage('Realize o login!', true)
      this.router.navigate(['/login'])
      return false
    } 
  }
}

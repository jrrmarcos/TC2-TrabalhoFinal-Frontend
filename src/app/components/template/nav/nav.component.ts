import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router,
    private serviceUser: UserService,
    private auth: AutenticacaoService) { }

  token = this.auth.autenticado()

  ngOnInit(): void {
  }
  
  deslogar() {
    sessionStorage.setItem('token', null)
    sessionStorage.setItem('expiry', null)
    this.serviceUser.showMessage('Até a próxima!')
    this.router.navigate(['/login'])
  }
}

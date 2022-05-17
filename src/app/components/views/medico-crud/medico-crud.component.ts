import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-medico-crud',
  templateUrl: './medico-crud.component.html',
  styleUrls: ['./medico-crud.component.css']
})
export class MedicoCrudComponent implements OnInit {

  constructor(private router: Router,
    private auth: AutenticacaoService) { }

  ngOnInit(): void {
    this.auth.autenticado()
  }

  navigateToMedicoCreate() {
    if (this.auth.autenticado()) {
      this.router.navigate(['/medicos/create'])
    }
  }
}

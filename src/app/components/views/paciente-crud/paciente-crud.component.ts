import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-paciente-crud',
  templateUrl: './paciente-crud.component.html',
  styleUrls: ['./paciente-crud.component.css']
})
export class PacienteCrudComponent implements OnInit {

  constructor(private router: Router,
    private auth: AutenticacaoService) { }

  ngOnInit(): void {
    this.auth.autenticado()
  }

  navigateToPacienteCreate() {
    if (this.auth.autenticado()) {
      this.router.navigate(['/pacientes/create'])
    }
  }

}

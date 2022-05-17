import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-consulta-crud',
  templateUrl: './consulta-crud.component.html',
  styleUrls: ['./consulta-crud.component.css']
})
export class ConsultaCrudComponent implements OnInit {

  constructor(private router: Router,
    private auth: AutenticacaoService) { }

  ngOnInit(): void {
    this.auth.autenticado()
  }

  navigateToConsultaCreate() {
    if (this.auth.autenticado()) {
      this.router.navigate(['/consultas/create'])
    }
  }

}

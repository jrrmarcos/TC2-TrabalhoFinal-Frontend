import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialidade } from 'src/app/model/especialidade.model';
import { Medico } from 'src/app/model/medico.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-medico-create',
  templateUrl: './medico-create.component.html',
  styleUrls: ['./medico-create.component.css']
})
export class MedicoCreateComponent implements OnInit {


  especialidades: Especialidade[];
  medico: Medico;

  medicoForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    idEspecialidade: new FormControl('', Validators.required),
  });

  constructor(private router: Router,
    private serviceMedico: MedicoService,
    private auth: AutenticacaoService) { }

  ngOnInit(): void {
    if (this.auth.autenticado()) {
      this.serviceMedico.getEspecialidades().subscribe(especialidades => {
        this.especialidades = especialidades.map(function (e) {
          return { "id": e.id, "nome": e.nome }
        })
      })
    }
  }

  createMedico() {
    if (this.auth.autenticado()) {
      if (this.medicoForm.valid) {
        this.medico = this.medicoForm.value;
        alert(this.medico.idEspecialidade)
        this.serviceMedico.addMedico(this.medico).subscribe(res => {
          alert(JSON.stringify(res));
          if (res.status !== "Erro") {
            this.serviceMedico.showMessage('Médico cadastrado!')
            this.router.navigate(['/medicos']);
          } else {
            this.serviceMedico.showMessage('Não foi possível efetuar o cadastro do médico', true)
          }
        })
      } else {
        this.serviceMedico.showMessage('Dados ausentes! - Preencha todos os campos', true)
      }
    }
  }

  cancelar() {
    if (this.auth.autenticado()) {
      this.serviceMedico.showMessage('Operação cancelada!')
      this.router.navigate(['/medicos'])
    }
  }

}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/model/paciente.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-create',
  templateUrl: './paciente-create.component.html',
  styleUrls: ['./paciente-create.component.css']
})
export class PacienteCreateComponent implements OnInit {

  paciente!: Paciente
  pacienteForm: FormGroup

  constructor(private router: Router,
    private servicePaciente: PacienteService,
    private auth: AutenticacaoService,
    private local: Location) { }

  ngOnInit(): void {
    if(this.auth.autenticado()){
      this.initForm()
    }
  }

  initForm() {
    this.pacienteForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required)
    })
  }

  createPaciente() {
    if (this.auth.autenticado()) {
      if (this.pacienteForm.valid) {
        this.paciente = this.pacienteForm.value;
        this.servicePaciente.addPaciente(this.paciente).subscribe(res => {
          if (res.status !== "Erro") {
            this.servicePaciente.showMessage('Paciente cadastrado!')
            this.router.navigate(['/pacientes']);
          } else {
            this.servicePaciente.showMessage('Não foi possível efetuar o cadastro do paciente', true)
          }
        })
      } else {
        this.servicePaciente.showMessage('Dados ausentes! - Preencha todos os campos', true)
      }
    }
  }

  cancelar() {
    if (this.auth.autenticado()) {
      this.servicePaciente.showMessage('Operação cancelada!')
      this.local.back()
    }
  }
}

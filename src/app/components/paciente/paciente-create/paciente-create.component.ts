import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/model/paciente.model';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-create',
  templateUrl: './paciente-create.component.html',
  styleUrls: ['./paciente-create.component.css']
})
export class PacienteCreateComponent implements OnInit {

  paciente!: Paciente

  pacienteForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    dataNascimento: new FormControl('', Validators.required)
  })

  constructor(private router: Router,
    private servicePaciente: PacienteService) { }

  ngOnInit(): void {
  }

  createPaciente(){
    if(this.pacienteForm.valid){
      this.paciente = this.pacienteForm.value;
      this.servicePaciente.addPaciente(this.paciente).subscribe(res => {
        if(res.status !== "Erro"){
          this.servicePaciente.showMessage('Paciente cadastrado!')
          this.router.navigate(['/pacientes']);
        } else{
          this.servicePaciente.showMessage('Não foi possível efetuar o cadastro do paciente',true)
        }
      })
    } else{
      this.servicePaciente.showMessage('Dados ausentes! - Preencha todos os campos',true)
    }
  }

  cancelar() {
    this.servicePaciente.showMessage('Operação cancelada!')
    this.router.navigate(['/pacientes'])
  }

}

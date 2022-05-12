import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Consulta } from 'src/app/model/consulta.model';
import { Medico } from 'src/app/model/medico.model';
import { Paciente } from 'src/app/model/paciente.model';
import { ConsultaService } from 'src/app/services/consulta.service';
import { MedicoService } from 'src/app/services/medico.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-consulta-create',
  templateUrl: './consulta-create.component.html',
  styleUrls: ['./consulta-create.component.css']
})
export class ConsultaCreateComponent implements OnInit {

  medico: Medico[]
  paciente: Paciente[]
  consulta: Consulta

  consultaForm = new FormGroup({
    idPaciente: new FormControl('', Validators.required),
    idMedico: new FormControl('', Validators.required),
    data: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required)
  });

  constructor(private router: Router,
    private serviceMedico: MedicoService,
    private servicePaciente: PacienteService,
    private serviceConsulta: ConsultaService) { }

  ngOnInit(): void {
    this.serviceMedico.getAllMedicos().subscribe(medicos => {
      this.medico = medicos.map(function (e) {
        return { "id": e.id, "nome": e.nome, "idEspecialidade": e.idEspecialidade }
      })
    })

    this.servicePaciente.getAllPacientes().subscribe(pacientes => {
      this.paciente = pacientes.map(function (e) {
        return { "id": e.id, "nome": e.nome, "dataNascimento": e.dataNascimento }
      })
    })
  }

  createConsulta() {
    if (this.consultaForm.valid) {
      this.consulta = this.consultaForm.value;
      this.serviceConsulta.addConsulta(this.consulta).subscribe(res => {
        if (res.status !== "Erro") {
          this.serviceConsulta.showMessage('Consulta cadastrada!')
          this.router.navigate(['/consultas']);
        } else {
          this.serviceConsulta.showMessage('Não foi possível efetuar o cadastro da consulta', true)
        }
      })
    } else {
      this.serviceConsulta.showMessage('Dados ausentes! - Preencha todos os campos', true)
    }
  }

  cancelar() {
    this.serviceConsulta.showMessage('Operação cancelada!')
    this.router.navigate(['/consultas'])
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/model/admin.model';
import { Paciente } from 'src/app/model/paciente.model';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-read',
  templateUrl: './paciente-read.component.html',
  styleUrls: ['./paciente-read.component.css']
})
export class PacienteReadComponent implements OnInit {

  paciente: Paciente[]
  displayedColumns = ['id', 'nome', 'dataNascimento', 'dataCadastro', 'action']

  constructor(private servicePaciente: PacienteService,
    private router: Router) { }

  ngOnInit(): void {
    this.servicePaciente.getAllPacientes().subscribe(paciente => {
      this.paciente = paciente.map(function (e) {
        return { "id": e.id, "nome": e.nome, "dataNascimento": e.dataNascimento, "dataCadastro": e.dataCadastro}
      })
    })
  }
}

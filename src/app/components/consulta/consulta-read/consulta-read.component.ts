import { Component, OnInit } from '@angular/core';
import { Consulta } from 'src/app/model/consulta.model';
import { Medico } from 'src/app/model/medico.model';
import { Paciente } from 'src/app/model/paciente.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ConsultaService } from 'src/app/services/consulta.service';
import { MedicoService } from 'src/app/services/medico.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-consulta-read',
  templateUrl: './consulta-read.component.html',
  styleUrls: ['./consulta-read.component.css']
})
export class ConsultaReadComponent implements OnInit {
  paciente: Paciente[]
  medico: Medico[]
  consultas: Consulta[]
  displayedColumns = ['id', 'idPaciente', 'idMedico', 'data', 'action']

  constructor(private serviceConsulta: ConsultaService,
    private serviceMedico: MedicoService,
    private servicePaciente: PacienteService,
    private auth: AutenticacaoService) { }

  ngOnInit(): void {
    if (this.auth.autenticado()) {
      this.servicePaciente.getAllPacientes().subscribe(paciente => {
        this.paciente = paciente.map(function (e) {
          return { "id": e.id, "nome": e.nome, "dataNascimento": e.dataNascimento, "dataCadastro": e.dataCadastro }
        })
      })

      this.serviceMedico.getAllMedicos().subscribe(medico => {
        this.medico = medico.map(function (e) {
          return { "id": e.id, "nome": e.nome, "data": e.dataCadastro, "idEspecialidade": e.idEspecialidade }
        })
      })

      this.serviceConsulta.getAllConsultas().subscribe(consultas => {
        this.consultas = consultas.map(function (e) {
          return { "id": e.id, "idPaciente": e.idPaciente, "idMedico": e.idMedico, "data": e.data }
        })
      })
    }
  }

  getNamePaciente(id: number){
    if (this.paciente) return ( this.paciente.filter(paciente => paciente.id == id)[0].nome ) 
  }

  getNameMedico(id: number){
    if (this.medico) return ( this.medico.filter(medico => medico.id == id)[0].nome ) 
  }

}

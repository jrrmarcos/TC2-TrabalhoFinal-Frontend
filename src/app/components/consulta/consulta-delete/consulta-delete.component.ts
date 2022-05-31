import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Consulta } from 'src/app/model/consulta.model';
import { Medico } from 'src/app/model/medico.model';
import { Paciente } from 'src/app/model/paciente.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ConsultaService } from 'src/app/services/consulta.service';
import { MedicoService } from 'src/app/services/medico.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-consulta-delete',
  templateUrl: './consulta-delete.component.html',
  styleUrls: ['./consulta-delete.component.css']
})
export class ConsultaDeleteComponent implements OnInit {

  consulta: Consulta
  medico: Medico[]
  paciente: Paciente[]

  constructor(private router: Router,
    private route: ActivatedRoute,
    private serviceConsulta: ConsultaService,
    private serviceMedico: MedicoService,
    private servicePaciente: PacienteService,
    private auth: AutenticacaoService,
    private local: Location) { }

  ngOnInit(): void {
    if (this.auth.autenticado()) {
      const id = this.route.snapshot.paramMap.get('id')
      this.serviceConsulta.getAllConsultas().subscribe(consultas => {
        this.consulta = consultas.filter(obj => String(obj.id) === id)[0]
      })

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
  }

  deleteConsulta(): void {
    if (this.auth.autenticado()) {
      this.serviceConsulta.deleteConsulta(this.consulta).subscribe((res) => {
        if (res.status !== 'Erro') {
          this.serviceConsulta.showMessage('Consulta removida!')
          this.router.navigate(['/consultas'])
        } else { 
          this.serviceConsulta.showMessage('Houve um erro!', true)
          this.router.navigate(['/consultas'])
        }
      })
    }
  }

  cancelar(): void {
    if (this.auth.autenticado()) {
      this.serviceConsulta.showMessage('Operação cancelada!')
      this.local.back()
    }
  }

  getNamePaciente(id: number) {
    if (this.paciente) return (this.paciente.filter(paciente => paciente.id == id)[0].nome)
  }

  getNameMedico(id: number) {
    if (this.medico) return (this.medico.filter(medico => medico.id == id)[0].nome)
  }

}

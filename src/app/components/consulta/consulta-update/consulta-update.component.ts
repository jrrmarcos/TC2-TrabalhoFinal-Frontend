import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Consulta } from 'src/app/model/consulta.model';
import { Medico } from 'src/app/model/medico.model';
import { Paciente } from 'src/app/model/paciente.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ConsultaService } from 'src/app/services/consulta.service';
import { MedicoService } from 'src/app/services/medico.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-consulta-update',
  templateUrl: './consulta-update.component.html',
  styleUrls: ['./consulta-update.component.css']
})
export class ConsultaUpdateComponent implements OnInit {

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
    private route: ActivatedRoute,
    private serviceMedico: MedicoService,
    private servicePaciente: PacienteService,
    private serviceConsulta: ConsultaService,
    private auth: AutenticacaoService) { }

  ngOnInit(): void {
    if (this.auth.autenticado() == true) {
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

  updateConsulta() {
    if (this.auth.autenticado()) {
      if (this.consultaForm.valid) {
        this.consulta.idPaciente = this.consultaForm.get('idPaciente').value;
        this.consulta.idMedico = this.consultaForm.get('idMedico').value;
        this.consulta.data = this.consultaForm.get('data').value;
        this.consulta.time = this.consultaForm.get('time').value;
        this.serviceConsulta.updateConsulta(this.consulta).subscribe(res => {
          if (res.status !== "Erro") {
            this.serviceConsulta.showMessage('Consulta alterada!')
            this.router.navigate(['/consultas']);
          } else {
            this.serviceConsulta.showMessage('Não foi possível atualizar consulta', true)
          }
        })
      } else {
        this.serviceConsulta.showMessage('Dados ausentes! - Preencha todos os campos', true)
      }
    }
  }

  cancelar() {
    if (this.auth.autenticado()) {
      this.serviceConsulta.showMessage('Operação cancelada!')
      this.router.navigate(['/consultas'])
    }
  }

}

import { Location } from '@angular/common';
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
  consultaForm: FormGroup

  constructor(private router: Router,
    private route: ActivatedRoute,
    private serviceMedico: MedicoService,
    private servicePaciente: PacienteService,
    private serviceConsulta: ConsultaService,
    private auth: AutenticacaoService,
    private local: Location) { }

  ngOnInit(): void {
    if (this.auth.autenticado() == true) {
      this.initForm()

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

  initForm() {
    this.consultaForm = new FormGroup({
      idPaciente: new FormControl('', Validators.required),
      idMedico: new FormControl('', Validators.required),
      data: new FormControl('', [Validators.required, this.dataValidator]),
      time: new FormControl('', Validators.required)
    });
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
        if (this.consultaForm.get('idPaciente').invalid) {
          if (this.consultaForm.get('idPaciente').value == '') this.servicePaciente.showMessage('O campo Paciente está vazio', true);
        }

        else if (this.consultaForm.get('idMedico').invalid) {
          if (this.consultaForm.get('idMedico').value == '') this.servicePaciente.showMessage('O campo Médico está vazio', true);
        }

        else if (this.consultaForm.get('time').invalid) {
          if (this.consultaForm.get('time').value == '') {
            this.serviceConsulta.showMessage('O campo horário está vazio', true);
          }
        }
  
        else if (this.consultaForm.get('data').invalid) {
          if (this.consultaForm.get('data').value == '') {
            this.serviceConsulta.showMessage('O campo data está vazio', true);
          } 
          else{
            const currentDate : Date = new Date();
            currentDate.setHours(20);
            const selectedDate : Date = new Date(this.consultaForm.get('data').value);       

            const compareCurrentDate : string = currentDate.getUTCDate() + "-" + currentDate.getUTCMonth() + "-" + currentDate.getFullYear();
            const compareSelectedDate : string = selectedDate.getUTCDate() + "-" + selectedDate.getUTCMonth() + "-" + selectedDate.getFullYear(); 

            if(compareSelectedDate === compareCurrentDate) {
              this.serviceConsulta.showMessage('A data inserida é igual a data atual, as consultas devem ser agendadas com, ao menos, um dia de antecedência', true);
            }
            else if (selectedDate < currentDate) { 
              this.serviceConsulta.showMessage('A data inserida é anterior a data atual', true);
            }
          }
        }
      }
    }
  }

  cancelar() {
    if (this.auth.autenticado()) {
      this.serviceConsulta.showMessage('Operação cancelada!')
      this.local.back()
    }
  }

  dataValidator(control: FormControl) : { [s: string]: boolean } {
    const currentDate : Date = new Date();
    currentDate.setHours(20);

    if (new Date(control.value).getUTCDate() <= currentDate.getUTCDate()) return { 'invalidDate': true }
  }

  getNamePaciente(id: number){
    if (this.paciente) return ( this.paciente.filter(paciente => paciente.id == id)[0].nome ) 
  }

  getNameMedico(id: number){
    if (this.medico) return ( this.medico.filter(medico => medico.id == id)[0].nome ) 
  }

}

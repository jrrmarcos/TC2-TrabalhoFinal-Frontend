import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/model/admin.model';
import { Paciente } from 'src/app/model/paciente.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-update',
  templateUrl: './paciente-update.component.html',
  styleUrls: ['./paciente-update.component.css']
})
export class PacienteUpdateComponent implements OnInit {

  paciente: Paciente
  admin: Admin
  pacienteForm: FormGroup

  constructor(private router: Router,
    private route: ActivatedRoute,
    private servicePaciente: PacienteService,
    private auth: AutenticacaoService,
    private local: Location) { }

  ngOnInit(): void {
    if (this.auth.autenticado()) {
      this.initForm()
      
      const id = this.route.snapshot.paramMap.get('id')
      this.servicePaciente.getAllPacientes().subscribe(pacientes => {
        this.paciente = pacientes.filter(obj => String(obj.id) === id)[0]
      })
    }
  }

  initForm() {
    this.pacienteForm = new FormGroup({
       nome: new FormControl('', Validators.required),
       dataNascimento: new FormControl('', [Validators.required, this.dataValidator])
     })
   }

  updatePaciente() {
    if (this.auth.autenticado()) {
      if (this.pacienteForm.valid) {
        this.paciente.nome = this.pacienteForm.get('nome').value;
        this.paciente.dataNascimento = this.pacienteForm.get('dataNascimento').value;
        this.servicePaciente.updatePaciente(this.paciente).subscribe(res => {
          if (res.status !== "Erro") {
            this.servicePaciente.showMessage('Registro atualizado!')
            this.router.navigate(['/pacientes']);
          } else {
            this.servicePaciente.showMessage('Não foi possível atualizar o registro do paciente', true)
          }
        })
      } else {
        if (this.pacienteForm.get('nome').invalid) {
          if (this.pacienteForm.get('nome').value == '') this.servicePaciente.showMessage('O campo nome está vazio', true);
        }
  
        else if (this.pacienteForm.get('dataNascimento').invalid) {
          if (this.pacienteForm.get('dataNascimento').value == '') {
            this.servicePaciente.showMessage('O campo data de nascimento está vazio', true);
          } else if (new Date(this.pacienteForm.get('dataNascimento').value) > new Date()) {
            this.servicePaciente.showMessage('A data inserida é posterior a data atual', true);
          }
        }
      }
    }
  }

  cancelar() {
    if (this.auth.autenticado()) {
      this.servicePaciente.showMessage('Operação cancelada!')
      this.local.back()
    }
  }

  dataValidator(control: FormControl) : { [s: string]: boolean } {
    if (new Date(control.value) > new Date()) return { 'invalidDate': true }
    return null;
  }

}

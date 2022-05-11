import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/model/admin.model';
import { Paciente } from 'src/app/model/paciente.model';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-update',
  templateUrl: './paciente-update.component.html',
  styleUrls: ['./paciente-update.component.css']
})
export class PacienteUpdateComponent implements OnInit {

  paciente: Paciente
  admin: Admin

  pacienteForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    dtnasc: new FormControl('', Validators.required)
  })

  constructor(private router: Router,
              private route: ActivatedRoute,
              private servicePaciente: PacienteService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    //this.servicePaciente.getById(id).subscribe(brand => {
      //this.paciente = paciente
    //})
  }

  getUser(): Admin {
    return this.admin = JSON.parse(localStorage.getItem('admin') || '{}')
  }

  updateBrand(){
    if(this.pacienteForm.valid){
      /*LÓGICA A SER REFORMULADA
      this.servicePaciente.addBrand(this.paciente).subscribe(res => {
        if(res.ok){
          this.servicePaciente.showMessage('Paciente alterado!')
          this.router.navigate(['/pacientes']);
        } else{
          this.servicePaciente.showMessage('Não foi possível efetuar a atualização do paciente', true)
        }
      })
    } else{
      this.servicePaciente.showMessage('Dados ausentes! - Preencha todos os campos', true)
    */
    }
  }

  cancelar() {
    //this.servicePaciente.showMessage('Operação cancelada!')
    this.router.navigate(['/pacientes'])
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialidade } from 'src/app/model/especialidade.model';
import { Medico } from 'src/app/model/medico.model';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css']
})
export class CarCreateComponent implements OnInit {

  especialidades : Especialidade[];
  medico : Medico;

  medicoForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    idEspecialidade: new FormControl('', Validators.required),
  });

  constructor(private router: Router,
              private serviceMedico: MedicoService) { }

  ngOnInit(): void {
    this.serviceMedico.getEspecialidades().subscribe(especialidades => {
      console.log(JSON.stringify(especialidades));
      this.especialidades = especialidades.map(function (e){
        return{ "id": e.id, "nome": e.nome}
      })
    })
  }

  createMedico(){
    if(this.medicoForm.valid){
      this.medico = this.medicoForm.value;
      alert(this.medico.idEspecialidade)
      this.serviceMedico.addMedico(this.medico).subscribe(res => {
        alert(JSON.stringify(res));
        if(res.status !== "Erro"){
          this.serviceMedico.showMessage('Médico cadastrado!')
          this.router.navigate(['/veiculos']);
        } else{
          this.serviceMedico.showMessage('Não foi possível efetuar o cadastro do médico',true)
        }
      })
    } else{
      this.serviceMedico.showMessage('Dados ausentes! - Preencha todos os campos',true)
    }
  }

  cancelar() {
    this.serviceMedico.showMessage('Operação cancelada!')
    this.router.navigate(['/veiculos'])
  }

}

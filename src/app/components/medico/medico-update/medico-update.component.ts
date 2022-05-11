import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/model/admin.model';
import { Especialidade } from 'src/app/model/especialidade.model';
import { Medico } from 'src/app/model/medico.model';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-medico-update',
  templateUrl: './medico-update.component.html',
  styleUrls: ['./medico-update.component.css']
})
export class MedicoUpdateComponent implements OnInit {

  especialidades : Especialidade[];
  medico : Medico;
  especialidade: Especialidade

  medicoForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    idEspecialidade: new FormControl('', Validators.required),
  });

  constructor(private router: Router,
              private serviceMedico: MedicoService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.serviceMedico.getAllMedicos().subscribe(medicos => {
      this.medico  = medicos.filter(obj => String(obj.id) === id)[0]
    })    
    this.serviceMedico.getEspecialidades().subscribe(especialidades => {
      this.especialidades = especialidades.map(function (e){
        return{ "id": e.id, "nome": e.nome}
      })
    })
  }

  updateMedico(){
    if(this.medicoForm.valid){
      this.medico.nome = this.medicoForm.get('nome').value;
      this.medico.idEspecialidade = this.medicoForm.get('idEspecialidade').value;
      this.serviceMedico.updateMedico(this.medico).subscribe(res => {
        if(res.status !== "Erro"){
          this.serviceMedico.showMessage('Registro atualizado!')
          this.router.navigate(['/medicos']);
        } else{
          this.serviceMedico.showMessage('Não foi possível atualizar o registro do médico',true)
        }
      })
    } else{
      this.serviceMedico.showMessage('Dados ausentes! - Preencha todos os campos',true)
    }
  }

  cancelar() {
    this.serviceMedico.showMessage('Operação cancelada!')
    this.router.navigate(['/medicos'])
  }

}

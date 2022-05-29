import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Especialidade } from 'src/app/model/especialidade.model';
import { Medico } from 'src/app/model/medico.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-medico-read',
  templateUrl: './medico-read.component.html',
  styleUrls: ['./medico-read.component.css']
})
export class MedicoReadComponent implements OnInit {

  medicos: Medico[]
  medicosCopia: Medico[]
  especialidades : Especialidade[]
  mostraEspecialidades : boolean = false;
  msgBotao : string = "Mostrar Especialidades";
  displayedColumns = ['id', 'nome', 'data', 'idEspecialidade', 'action']

  constructor(private serviceMedico: MedicoService,
    private router: Router,
    private auth: AutenticacaoService) { }
  
  onShowOrClose(){
    if(this.mostraEspecialidades === false){
      this.mostraEspecialidades = true;
      this.msgBotao = "Fechar Especialidades"
    }
    else{
      this.mostraEspecialidades = false;
      this.msgBotao = "Mostrar Especialidades"
    }
  }

  filtraListaMedicos(id : number){
    if(id != 0) this.medicos = this.medicosCopia.filter(element => element.idEspecialidade === id);
    else this.medicos = this.medicosCopia;
  }

  ngOnInit(): void {
    if (this.auth.autenticado()) {
      this.serviceMedico.getAllMedicos().subscribe(medicos => {
        this.medicos = medicos.map(function (e) {
          return { "id": e.id, "nome": e.nome, "data": e.dataCadastro, "idEspecialidade": e.idEspecialidade }
        })
        this.medicosCopia = this.medicos;
      })

      this.serviceMedico.getEspecialidades().subscribe(especialidades => {
        this.especialidades = especialidades.map(function (e) {
          return { "id": e.id, "nome": e.nome }
        })
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medico } from 'src/app/model/medico.model';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-medico-read',
  templateUrl: './medico-read.component.html',
  styleUrls: ['./medico-read.component.css']
})
export class MedicoReadComponent implements OnInit {

  medicos: Medico[]
  displayedColumns = ['id','nome','data','idEspecialidade','action']

  constructor(private serviceMedico: MedicoService,
              private router: Router) { }

  ngOnInit(): void {
    this.serviceMedico.getAllMedicos().subscribe(medicos => {
      this.medicos = medicos.map(function (e){
        return{ "id": e.id, "nome": e.nome, "data": e.dataCadastro, "idEspecialidade": e.idEspecialidade}
      })
    })
  }

}

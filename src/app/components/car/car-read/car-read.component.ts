import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medico } from 'src/app/model/medico.model';
import { User } from 'src/app/model/user.model';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-car-read',
  templateUrl: './car-read.component.html',
  styleUrls: ['./car-read.component.css']
})
export class CarReadComponent implements OnInit {

  medicos: Medico[]
  displayedColumns = ['id','nome','data','idEspecialidade']

  constructor(private serviceMedico: MedicoService,
              private router: Router) { }

  ngOnInit(): void {
    this.serviceMedico.getAllMedicos().subscribe(medicos => {
      console.log(JSON.stringify(medicos));
      this.medicos = medicos.map(function (e){
        return{ "id": e.id, "nome": e.nome, "data": e.dataCadastro, "idEspecialidade": e.idEspecialidade}
      })
    })
  }

}

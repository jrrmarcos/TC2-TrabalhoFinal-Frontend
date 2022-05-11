import { Component, OnInit } from '@angular/core';
import { Consulta } from 'src/app/model/consulta.model';

@Component({
  selector: 'app-consulta-read',
  templateUrl: './consulta-read.component.html',
  styleUrls: ['./consulta-read.component.css']
})
export class ConsultaReadComponent implements OnInit {

  consultas: Consulta[]
  displayedColumns = ['id','idPaciente','idMedico','data','action']

  constructor(private serviceConsulta: ServiceConsulta) { }

  ngOnInit(): void {
    this.serviceConsulta.getAllConsultas().subscribe(consultas => {
      this.consultas = consultas.map(function (e){
        return{ "id": e.id, "idPaciente": e.idPaciente, "idMedico": e.idMedico, "data": e.data}
      })
    })
  }

}

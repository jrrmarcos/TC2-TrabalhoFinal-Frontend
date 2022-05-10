import { Component, OnInit } from '@angular/core';
import { Consulta } from 'src/app/model/consulta.model';

@Component({
  selector: 'app-consulta-read',
  templateUrl: './consulta-read.component.html',
  styleUrls: ['./consulta-read.component.css']
})
export class ConsultaReadComponent implements OnInit {

  consultas: Consulta[]
  displayedColumns = ['idPaciente','idMedico','data','hora','action']

  constructor() { }

  ngOnInit(): void {
  }

}

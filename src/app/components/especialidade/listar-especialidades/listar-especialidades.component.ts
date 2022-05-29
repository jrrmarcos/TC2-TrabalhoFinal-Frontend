import { Input, Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Especialidade } from 'src/app/model/especialidade.model';

@Component({
  selector: 'app-listar-especialidades',
  templateUrl: './listar-especialidades.component.html',
  styleUrls: ['./listar-especialidades.component.css']
})
export class ListarEspecialidadesComponent implements OnInit {

  @Input() especialidades: Especialidade[]
  @Output() filtraListaMedicos = new EventEmitter<number>();
  displayedColumns = ['idEspecialidade', 'nomeEspecialidade', 'action']

  filtrarListaMedicos(id : number){
    this.filtraListaMedicos.emit(id);
  }

  constructor() { }

  ngOnInit(): void {
  }

}

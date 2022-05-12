import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Consulta } from 'src/app/model/consulta.model';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-consulta-delete',
  templateUrl: './consulta-delete.component.html',
  styleUrls: ['./consulta-delete.component.css']
})
export class ConsultaDeleteComponent implements OnInit {

  consulta: Consulta

  constructor(private router: Router,
    private route: ActivatedRoute,
    private serviceConsulta: ConsultaService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.serviceConsulta.getAllConsultas().subscribe(consultas => {
      this.consulta  = consultas.filter(obj => String(obj.id) === id)[0]
    })    
  }

  deleteConsulta(): void {
    this.serviceConsulta.deleteConsulta(this.consulta).subscribe(() => {
      this.serviceConsulta.showMessage('Consulta removida!')
      this.router.navigate(['/consultas'])
    })
  }

  cancelar(): void {
    this.serviceConsulta.showMessage('Operação cancelada!')
    this.router.navigate(['/consultas'])
  }

}

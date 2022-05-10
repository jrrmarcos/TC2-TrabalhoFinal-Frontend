import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-crud',
  templateUrl: './consulta-crud.component.html',
  styleUrls: ['./consulta-crud.component.css']
})
export class ConsultaCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToConsultaCreate(){
    this.router.navigate(['/consultas/create'])
  }

}

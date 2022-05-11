import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico-crud',
  templateUrl: './medico-crud.component.html',
  styleUrls: ['./medico-crud.component.css']
})
export class MedicoCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToMedicoCreate(){
    this.router.navigate(['/medicos/create'])
  }
}

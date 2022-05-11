import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/model/paciente.model';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-delete',
  templateUrl: './paciente-delete.component.html',
  styleUrls: ['./paciente-delete.component.css']
})
export class PacienteDeleteComponent implements OnInit {

  paciente!: Paciente

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private servicePaciente: PacienteService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.servicePaciente.getAllPacientes().subscribe(pacientes => {
      this.paciente  = pacientes.filter(obj => String(obj.id) === id)[0]
    })  
  }

  deletePaciente(): void {
    this.servicePaciente.deletePaciente(this.paciente).subscribe(() => {
      this.servicePaciente.showMessage('Paciente removido!')
      this.router.navigate(['/pacientes'])
    })
  }

  cancelar(): void {
    this.servicePaciente.showMessage('Operação cancelada!')
    this.router.navigate(['/pacientes'])
  }
}

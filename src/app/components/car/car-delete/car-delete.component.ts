import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/model/car.model';
import { Medico } from 'src/app/model/medico.model';
import { CarService } from 'src/app/services/car.service';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {

  medico: Medico
  medicosId: Medico[]

  constructor(private router: Router,
    private route: ActivatedRoute,
    private serviceMedico: MedicoService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')

    this.serviceMedico.getAllMedicos().subscribe(medicos => {
      this.medico = medicos.map(function (obj) {

        if (obj.id === id) {
          this.medico.id = obj.id,
            this.medico.nome = obj.nome,
            this.medico.data = obj.dataCadastro,
            this.medico.idEspecialidade = obj.idEspecialidade
        }
      })
    })
    alert(JSON.stringify(this.medico.nome))
  }

  deleteMedico(): void {
    this.serviceMedico.deleteMedico(`${this.medico.id}`).subscribe(() => {
      this.serviceMedico.showMessage('Médico removido!')
      this.router.navigate(['/veiculos'])
    })
  }

  cancelar(): void {
    this.serviceMedico.showMessage('Operação cancelada!')
    this.router.navigate(['/veiculos'])
  }

}

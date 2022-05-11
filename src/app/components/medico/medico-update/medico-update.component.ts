import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/model/admin.model';
import { Especialidade } from 'src/app/model/especialidade.model';
import { Medico } from 'src/app/model/medico.model';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-medico-update',
  templateUrl: './medico-update.component.html',
  styleUrls: ['./medico-update.component.css']
})
export class MedicoUpdateComponent implements OnInit {

  medico: Medico[]
  especialidades: Especialidade
  admin: Admin

  medicoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required)
  });

  constructor(private router: Router,
    private route: ActivatedRoute,
    private medicoService: MedicoService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.medicoService.readById(id)
  }

  getUser(): Admin {
    return this.admin = JSON.parse(localStorage.getItem('admin') || '{}')
  }

  updateCar() {
    if (this.medicoForm.valid) {
    /* LÓGICA A SER REFORMULADA PARA MÉDICOS
    this.medicoService.addMedico().subscribe(res => {
      if(res.ok){
        this.medicoService.showMessage('Veículo alterado!')
        this.router.navigate(['/veiculos']);
      } else{
        this.medicoService.showMessage('Não foi possível efetuar a atualização do veículo',true)
      }
    })
  } else{
    this.medicoService.showMessage('Dados ausentes! - Preencha todos os campos',true)
*/
  }
}

  cancelar() {
    this.medicoService.showMessage('Operação cancelada!')
    this.router.navigate(['/medicos'])
  }

}

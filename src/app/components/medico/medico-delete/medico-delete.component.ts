import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medico } from 'src/app/model/medico.model';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-medico-delete',
  templateUrl: './medico-delete.component.html',
  styleUrls: ['./medico-delete.component.css']
})
export class MedicoDeleteComponent implements OnInit {

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
      this.router.navigate(['/medicos'])
    })
  }

  cancelar(): void {
    this.serviceMedico.showMessage('Operação cancelada!')
    this.router.navigate(['/medicos'])
  }

}

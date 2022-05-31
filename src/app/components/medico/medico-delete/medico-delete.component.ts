import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialidade } from 'src/app/model/especialidade.model';
import { Medico } from 'src/app/model/medico.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-medico-delete',
  templateUrl: './medico-delete.component.html',
  styleUrls: ['./medico-delete.component.css']
})
export class MedicoDeleteComponent implements OnInit {

  medico: Medico
  especialidade: Especialidade
  medicosId: Medico[]

  constructor(private router: Router,
    private route: ActivatedRoute,
    private serviceMedico: MedicoService,
    private auth: AutenticacaoService,
    private local: Location) { }

  ngOnInit(): void {
    if (this.auth.autenticado()) {
      const id = this.route.snapshot.paramMap.get('id')
      this.serviceMedico.getAllMedicos().subscribe(medicos => {
        this.medico = medicos.filter(obj => String(obj.id) === id)[0]
        this.serviceMedico.getEspecialidades().subscribe(especialidades => {
          this.especialidade = especialidades.filter(obj => obj.id === this.medico.idEspecialidade)[0]
        })
      })
    }
  }

  deleteMedico(): void {
    if (this.auth.autenticado()) {
      this.serviceMedico.deleteMedico(this.medico).subscribe((res) => {
        if (res.status !== 'Erro') {
          this.serviceMedico.showMessage('Médico removido!')
          this.router.navigate(['/medicos'])
        } else { 
          this.serviceMedico.showMessage('Houve algum problema!', true)
          this.router.navigate(['/medicos'])
        }
      })
    }
  }

  cancelar(): void {
    if (this.auth.autenticado()) {
      this.serviceMedico.showMessage('Operação cancelada!')
      this.local.back()
    }
  }
}

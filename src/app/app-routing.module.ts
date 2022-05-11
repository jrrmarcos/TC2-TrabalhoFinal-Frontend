import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ConsultaCreateComponent } from './components/consulta/consulta-create/consulta-create.component';
import { ConsultaCrudComponent } from './components/views/consulta-crud/consulta-crud.component';
import { ConsultaUpdateComponent } from './components/consulta/consulta-update/consulta-update.component';
import { ConsultaDeleteComponent } from './components/consulta/consulta-delete/consulta-delete.component';
import { MedicoCrudComponent } from './components/views/medico-crud/medico-crud.component';
import { MedicoCreateComponent } from './components/medico/medico-create/medico-create.component';
import { MedicoUpdateComponent } from './components/medico/medico-update/medico-update.component';
import { MedicoDeleteComponent } from './components/medico/medico-delete/medico-delete.component';
import { PacienteCrudComponent } from './components/views/paciente-crud/paciente-crud.component';
import { PacienteCreateComponent } from './components/paciente/paciente-create/paciente-create.component';
import { PacienteUpdateComponent } from './components/paciente/paciente-update/paciente-update.component';
import { PacienteDeleteComponent } from './components/paciente/paciente-delete/paciente-delete.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "medicos",
    component: MedicoCrudComponent
  },
  {
    path: "medicos/create",
    component: MedicoCreateComponent
  },
  {
    path: "medicos/update/:id",
    component: MedicoUpdateComponent
  },
  {
    path: "medicos/delete/:id",
    component: MedicoDeleteComponent
  },
  {
    path: "pacientes",
    component: PacienteCrudComponent
  },
  {
    path: "pacientes/create",
    component: PacienteCreateComponent
  },
  {
    path: "pacientes/update/:id",
    component: PacienteUpdateComponent
  },
  {
    path: "pacientes/delete/:id",
    component: PacienteDeleteComponent
  },
  {
    path: "consultas",
    component: ConsultaCrudComponent
  },
  {
    path: "consultas/create",
    component: ConsultaCreateComponent
  },
  {
    path: "consultas/update/:id",
    component: ConsultaUpdateComponent
  },
  {
    path: "consultas/delete/:id",
    component: ConsultaDeleteComponent
  },
  {
    path: "**",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

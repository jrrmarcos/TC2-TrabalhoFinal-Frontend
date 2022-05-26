import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';

import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './components/views/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './components/login/login.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';

import { RouterModule } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConsultaCrudComponent } from './components/views/consulta-crud/consulta-crud.component';
import { ConsultaCreateComponent } from './components/consulta/consulta-create/consulta-create.component';
import { ConsultaReadComponent } from './components/consulta/consulta-read/consulta-read.component';
import { ConsultaUpdateComponent } from './components/consulta/consulta-update/consulta-update.component';
import { ConsultaDeleteComponent } from './components/consulta/consulta-delete/consulta-delete.component';
import { MedicoCrudComponent } from './components/views/medico-crud/medico-crud.component';
import { MedicoCreateComponent } from './components/medico/medico-create/medico-create.component';
import { MedicoUpdateComponent } from './components/medico/medico-update/medico-update.component';
import { MedicoReadComponent } from './components/medico/medico-read/medico-read.component';
import { MedicoDeleteComponent } from './components/medico/medico-delete/medico-delete.component';
import { PacienteCreateComponent } from './components/paciente/paciente-create/paciente-create.component';
import { PacienteUpdateComponent } from './components/paciente/paciente-update/paciente-update.component';
import { PacienteReadComponent } from './components/paciente/paciente-read/paciente-read.component';
import { PacienteDeleteComponent } from './components/paciente/paciente-delete/paciente-delete.component';
import { PacienteCrudComponent } from './components/views/paciente-crud/paciente-crud.component'
import { AutenticacaoGuard } from './guards/autenticacao.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    ConsultaCrudComponent,
    ConsultaCreateComponent,
    ConsultaReadComponent,
    ConsultaUpdateComponent,
    ConsultaDeleteComponent,
    MedicoCrudComponent,
    MedicoCreateComponent,
    MedicoUpdateComponent,
    MedicoReadComponent,
    MedicoDeleteComponent,
    PacienteCreateComponent,
    PacienteUpdateComponent,
    PacienteReadComponent,
    PacienteDeleteComponent,
    PacienteCrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatGridListModule,
    MatMenuModule
  ],
  providers: [AutenticacaoGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

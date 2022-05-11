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
import { BrandCrudComponent } from './components/views/brand-crud/brand-crud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CarReadComponent } from './components/car/car-read/car-read.component';
import { LoginComponent } from './components/login/login.component';
import { CarCreateComponent } from './components/car/car-create/car-create.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarDeleteComponent } from './components/car/car-delete/car-delete.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { BrandCreateComponent } from './components/brand/brand-create/brand-create.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { BrandReadComponent } from './components/brand/brand-read/brand-read.component';
import { BrandDeleteComponent } from './components/brand/brand-delete/brand-delete.component';

import { RouterModule } from '@angular/router';
import { CarCrudComponent } from './components/views/car-crud/car-crud.component';

import {MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConsultaCrudComponent } from './components/views/consulta-crud/consulta-crud.component';
import { ConsultaCreateComponent } from './components/consulta/consulta-create/consulta-create.component';
import { ConsultaReadComponent } from './components/consulta/consulta-read/consulta-read.component';
import { ConsultaUpdateComponent } from './components/consulta/consulta-update/consulta-update.component';
import { ConsultaDeleteComponent } from './components/consulta/consulta-delete/consulta-delete.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    BrandCrudComponent,
    CarReadComponent,
    LoginComponent,
    CarCreateComponent,
    CarUpdateComponent,
    CarDeleteComponent,
    BrandCreateComponent,
    BrandUpdateComponent,
    BrandReadComponent,
    BrandDeleteComponent,
    CarCrudComponent,
    ConsultaCrudComponent,
    ConsultaCreateComponent,
    ConsultaReadComponent,
    ConsultaUpdateComponent,
    ConsultaDeleteComponent
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
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

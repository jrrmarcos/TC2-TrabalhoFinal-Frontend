import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './components/views/home/home.component';
import { BrandCrudComponent } from './components/views/brand-crud/brand-crud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { CarReadComponent } from './car/car-read/car-read.component';
import { LoginComponent } from './login/login.component';
import { CarCreateComponent } from './car/car-create/car-create.component';
import { CarUpdateComponent } from './car/car-update/car-update.component';
import { CarDeleteComponent } from './car/car-delete/car-delete.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { BrandCreateComponent } from './brand/brand-create/brand-create.component';
import { BrandUpdateComponent } from './brand/brand-update/brand-update.component';
import { BrandReadComponent } from './brand/brand-read/brand-read.component';
import { BrandDeleteComponent } from './brand/brand-delete/brand-delete.component';
import { MatCardModule } from '@angular/material/card';

import { Router, RouterModule } from '@angular/router';

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
    BrandDeleteComponent
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
    FormsModule,
    MatTableModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

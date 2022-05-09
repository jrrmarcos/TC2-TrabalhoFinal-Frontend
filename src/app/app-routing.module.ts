import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandCreateComponent } from './components/brand/brand-create/brand-create.component';
import { BrandDeleteComponent } from './components/brand/brand-delete/brand-delete.component';
import { BrandReadComponent } from './components/brand/brand-read/brand-read.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { CarCreateComponent } from './components/car/car-create/car-create.component';
import { CarDeleteComponent } from './components/car/car-delete/car-delete.component';
import { CarReadComponent } from './components/car/car-read/car-read.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { HomeComponent } from './components/views/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CarCrudComponent } from './components/views/car-crud/car-crud.component';
import { BrandCrudComponent } from './components/views/brand-crud/brand-crud.component';

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
    path: "veiculos",
    component: CarCrudComponent
  },
  {
    path: "veiculos/create",
    component: CarCreateComponent
  },
  {
    path: "veiculos/update/:id",
    component: CarUpdateComponent
  },
  {
    path: "veiculos/delete/:id",
    component: CarDeleteComponent
  },
  {
    path: "marcas",
    component: BrandCrudComponent
  },
  {
    path: "marcas/create",
    component: BrandCreateComponent
  },
  {
    path: "marcas/update/:id",
    component: BrandUpdateComponent
  },
  {
    path: "marcas/delete/:id",
    component: BrandDeleteComponent
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

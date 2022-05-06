import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandCreateComponent } from './brand/brand-create/brand-create.component';
import { BrandDeleteComponent } from './brand/brand-delete/brand-delete.component';
import { BrandReadComponent } from './brand/brand-read/brand-read.component';
import { BrandUpdateComponent } from './brand/brand-update/brand-update.component';
import { CarCreateComponent } from './car/car-create/car-create.component';
import { CarDeleteComponent } from './car/car-delete/car-delete.component';
import { CarReadComponent } from './car/car-read/car-read.component';
import { CarUpdateComponent } from './car/car-update/car-update.component';
import { HomeComponent } from './components/views/home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "veiculos",
    component: CarReadComponent
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
    component: BrandReadComponent
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
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

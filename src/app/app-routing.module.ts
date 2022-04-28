import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandReadComponent } from './brand/brand-read/brand-read.component';
import { CarReadComponent } from './car/car-read/car-read.component';
import { HomeComponent } from './components/views/home/home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "veiculos",
    component: CarReadComponent
  },
  {
    path: "marcas",
    component: BrandReadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

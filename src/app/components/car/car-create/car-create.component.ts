import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from 'src/app/model/brand.model';
import { Car } from 'src/app/model/car.model';
import { User } from 'src/app/model/user.model';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css']
})
export class CarCreateComponent implements OnInit {

  
  brand : Brand[];
  car : Car;
  user : User;

  carForm = new FormGroup({
    name: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required)
  });

  constructor(private router: Router,
              private serviceCar: CarService,
              private serviceBrand: BrandService) { }

  ngOnInit(): void {
  }

  getUser(): User {
    return this.user = JSON.parse(localStorage.getItem('user') || '{}')
  }

  createCar(){
    if(this.carForm.valid){
      this.car = this.carForm.value;
      this.car.userid = this.getUser()._id
      this.serviceCar.addCar(this.car).subscribe(res => {
        if(res.ok){
          this.serviceCar.showMessage('Veículo cadastrado!')
          this.router.navigate(['/veiculos']);
        } else{
          this.serviceCar.showMessage('Não foi possível efetuar o cadastro do veículo',true)
        }
      })
    } else{
      this.serviceCar.showMessage('Dados ausentes! - Preencha todos os campos',true)
    }
  }

  cancelar() {
    this.serviceCar.showMessage('Operação cancelada!')
    this.router.navigate(['/veiculos'])
  }

}

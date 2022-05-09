import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/model/brand.model';
import { Car } from 'src/app/model/car.model';
import { User } from 'src/app/model/user.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  brand : Brand[]
  car : Car
  user : User

  carForm = new FormGroup({
    name: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required)
  });
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private serviceCar: CarService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.serviceCar.getById(id).subscribe(car => {
      this.car = car 
    })
  }

  getUser(): User {
    return this.user = JSON.parse(localStorage.getItem('user') || '{}')
  }

  updateCar() {
    if(this.carForm.valid){
      this.car = this.carForm.value;
      this.car.userid = this.getUser()._id
      this.serviceCar.addCar(this.car).subscribe(res => {
        if(res.ok){
          this.serviceCar.showMessage('Veículo alterado!')
          this.router.navigate(['/veiculos']);
        } else{
          this.serviceCar.showMessage('Não foi possível efetuar a atualização do veículo',true)
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

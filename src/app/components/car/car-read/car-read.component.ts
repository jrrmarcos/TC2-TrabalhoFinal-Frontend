import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/model/car.model';
import { User } from 'src/app/model/user.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-read',
  templateUrl: './car-read.component.html',
  styleUrls: ['./car-read.component.css']
})
export class CarReadComponent implements OnInit {

  cars: Car[]
  displayedColumns = ['name','color','year','brand','action']

  constructor(private serviceCar: CarService,
              private router: Router) { }

  ngOnInit(): void {
    let user: User
    this.serviceCar.getAllCar(user._id).subscribe(cars => {
      this.cars = cars
    })
  }

}

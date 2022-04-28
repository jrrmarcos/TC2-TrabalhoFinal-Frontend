import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseCarService } from 'src/app/database.car.service';
import { Car } from 'src/app/model/car';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {

  car: Car
  
  carForm = new FormGroup({
    name: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required)
  });
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private serviceCar: DatabaseCarService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.serviceCar.getById(id).subscribe(car => {
      this.car = car 
    })
  }

  deleteCar(): void {
    this.serviceCar.deleteCar(`${this.car._id}`).subscribe(() => {
      this.router.navigate(['/veiculos'])
    })
  }

  cancelar(): void {
    this.router.navigate(['/veiculos'])
  }

}

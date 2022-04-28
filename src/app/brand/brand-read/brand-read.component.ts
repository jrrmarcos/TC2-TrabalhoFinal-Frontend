import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseBrandService } from 'src/app/database.brand.service';
import { Brand } from 'src/app/model/brand';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-brand-read',
  templateUrl: './brand-read.component.html',
  styleUrls: ['./brand-read.component.css']
})
export class BrandReadComponent implements OnInit {

  
  brands: Brand[]
  displayedColumns = ['name','color','year','brand','action']

  constructor(private serviceBrand: DatabaseBrandService,
              private router: Router) { }

  ngOnInit(): void {
    let user: User
    this.serviceBrand.getAllBrand(user._id).subscribe(brands => {
      this.brands = brands
    })
  }
}
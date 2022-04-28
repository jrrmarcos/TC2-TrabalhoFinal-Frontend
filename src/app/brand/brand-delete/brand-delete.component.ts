import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseBrandService } from 'src/app/database.brand.service';
import { Brand } from 'src/app/model/brand';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css']
})
export class BrandDeleteComponent implements OnInit {

  brand!: Brand

  brandForm = new FormGroup({
    name: new FormControl('', Validators.required)
  })
  
  constructor(private router: Router, 
              private route: ActivatedRoute,
              private serviceBrand: DatabaseBrandService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.serviceBrand.getById(id).subscribe(brand => {
      this.brand = brand
    })
  }

  deleteBrand(): void {
    this.serviceBrand.deleteBrand(`${this.brand._id}`).subscribe(() => {
      this.router.navigate(['/marcas'])
    })
  }

  cancelar(): void {
    this.router.navigate(['/marcas'])
  }

}

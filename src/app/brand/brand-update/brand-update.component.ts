import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseBrandService } from 'src/app/database.brand.service';
import { Brand } from 'src/app/model/brand';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brand!: Brand
  user!: User

  brandForm = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  constructor(private router: Router,
    private serviceBrand: DatabaseBrandService) { }

  ngOnInit(): void {
  }

  getUser(): User {
    return this.user = JSON.parse(localStorage.getItem('user') || '{}')
  }

  updateBrand(){
    if(this.brandForm.valid){
      this.brand = this.brandForm.value;
      this.brand.userid = this.getUser()._id;
      this.serviceBrand.addBrand(this.brand).subscribe(res => {
        if(res.ok){
          this.router.navigate(['/']);
        } else{
          alert('Não foi possível efetuar a atualização da marca')
        }
      })
    } else{
      alert('Dados ausentes! - Preencha todos os campos')
    }
  }

  cancelar() {
    this.router.navigate(['/'])
  }

}
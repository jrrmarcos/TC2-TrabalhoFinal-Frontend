import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from 'src/app/model/brand.model';
import { User } from 'src/app/model/user.model';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-create',
  templateUrl: './brand-create.component.html',
  styleUrls: ['./brand-create.component.css']
})
export class BrandCreateComponent implements OnInit {
  
  brand!: Brand
  user!: User

  brandForm = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  constructor(private router: Router,
    private serviceBrand: BrandService) { }

  ngOnInit(): void {
  }

  getUser(): User {
    return this.user = JSON.parse(localStorage.getItem('user') || '{}')
  }

  createBrand(){
    if(this.brandForm.valid){
      this.brand = this.brandForm.value;
      this.brand.userid = this.getUser()._id;
      this.serviceBrand.addBrand(this.brand).subscribe(res => {
        if(res.ok){
          this.router.navigate(['/']);
        } else{
          alert('Não foi possível efetuar o cadastro da marca')
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
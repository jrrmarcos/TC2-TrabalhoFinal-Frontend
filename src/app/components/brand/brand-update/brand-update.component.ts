import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/model/brand.model';
import { User } from 'src/app/model/user.model';
import { BrandService } from 'src/app/services/brand.service';

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
              private route: ActivatedRoute,
              private serviceBrand: BrandService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.serviceBrand.getById(id).subscribe(brand => {
      this.brand = brand
    })
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
          this.serviceBrand.showMessage('Marca alterada!')
          this.router.navigate(['/marcas']);
        } else{
          this.serviceBrand.showMessage('Não foi possível efetuar a atualização da marca', true)
        }
      })
    } else{
      this.serviceBrand.showMessage('Dados ausentes! - Preencha todos os campos', true)
    }
  }

  cancelar() {
    this.serviceBrand.showMessage('Operação cancelada!')
    this.router.navigate(['/marcas'])
  }

}
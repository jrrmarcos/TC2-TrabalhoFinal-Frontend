import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseUserService } from '../database.user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  user: User

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  constructor(private router: Router, 
              private serviceUser: DatabaseUserService) { }

  ngOnInit(): void {
  }

  
  onSubmitRegister() {
    if (!this.registerForm.invalid) {
      if (this.registerForm.value.password == this.registerForm.value.confirmPassword) {
        //Seta usuário
        this.user = this.registerForm.value;
        this.user.password = this.user.password;
        this.serviceUser.addUser(this.user).subscribe(res => {
          if (res.ok) {
            res.body.data = res.body.data.map(function (e) {
              return { "_id": e.id, "username": e.username, "email": e.email }
            });
            sessionStorage.setItem('user', JSON.stringify(res.body.data[0]))
            alert('Registro realizado com sucesso!')
            this.user = null;
            location.href = location.href + '/home';
          } else {
            alert('Não foi possível efetuar o Registro')
          }
        });
      } else {
        alert('As duas senhas não conferem!')
      }
    } else {
      alert('Dados ausentes! - Preencha todos os campos')
    }
  }
}

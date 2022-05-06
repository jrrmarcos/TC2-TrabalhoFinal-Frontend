import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User
  exibirCadastrar: boolean = true;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordconfirm: new FormControl('', Validators.required)
  });

  constructor(private router: Router,
              private serviceUser: UserService) { }

  ngOnInit(): void {
  }

  abrirCadastrar() {
    this.exibirCadastrar = false;
  }

  fecharCadastrar() {
    this.exibirCadastrar = true;
  }

  onSubmitLogin() {
    if (this.loginForm.valid) {
      this.user = this.loginForm.value
      this.user.password = this.user.password
      this.serviceUser.loginUser(this.user).subscribe(res => {
        if (res.ok) {
          res.body.data = res.body.data.map(function (e) {
            return { "_id": e.id, "username": e.username, "email": e.email }
          });
          sessionStorage.setItem('user', JSON.stringify(res.body.data[0]))
          alert('Login realizado com sucesso!')
          this.user = null;
          this.router.navigate(['/home']);
        } else {
          alert('Não foi possível efetuar o login')
        }
      })
    } else {
      alert('Dados ausentes! - Preencha todos os campos')
    }
  }

  onSubmitRegister() {
    if (!this.registerForm.invalid) {
      if (this.registerForm.value.password == this.registerForm.value.passwordconfirm) {
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
            this.router.navigate['/']
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

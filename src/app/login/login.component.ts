import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseUserService } from '../database.user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  
  constructor(private router: Router,
              private serviceUser: DatabaseUserService) { }

  ngOnInit(): void {
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

  chamaCadastro() {
    this.router.navigate(['/cadastro'])
  }
}

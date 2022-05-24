import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/model/admin.model';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  admin: Admin
  exibirCadastrar: boolean = true;
  autenticado = this.auth.autenticado() == true
  loginForm: FormGroup
  registerForm: FormGroup

  constructor(private router: Router,
    private serviceAdmin: AdministradoresService,
    private auth: AutenticacaoService) { }


  ngOnInit(): void {
    this.initLoginForm()
    this.initRegisterForm()
    if (this.auth.autenticado()) {
      this.router.navigate(['/home'])
    }
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
    });
  }

  initRegisterForm() {
    this.registerForm = new FormGroup({
      login: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      senhaconfirm: new FormControl('', Validators.required)
    });
  }

  abrirCadastrar() {
    this.exibirCadastrar = false;
  }

  fecharCadastrar() {
    this.exibirCadastrar = true;
  }
  
  onSubmitLogin() {
    if (this.loginForm.valid) {
      let login = this.loginForm.get('login').value
      let senha = this.loginForm.get('senha').value
      this.admin = { login: login, senha: senha }
      this.serviceAdmin.loginAdmin(this.admin).subscribe(res => {
        if (res.status === 200) {
          if (res.body.token != null) {
            sessionStorage.setItem('token', res.body.token)
            sessionStorage.setItem('expiry', String(this.auth.dataExpiracao()))
            this.serviceAdmin.showMessage('Bem-vindo, '+`${this.admin.login}`+'!')
            this.router.navigate(['/home']);
          } else {
            this.serviceAdmin.showMessage('Login ou senha inválidos', true)
            this.router.navigate(['/login']);
          }
        } else {
          this.serviceAdmin.showMessage('Não foi possível efetuar o login', true)
        }
      })
    } else {
      this.serviceAdmin.showMessage('Dados ausentes! - Preencha todos os campos', true)
    }
  }

  onSubmitRegister() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.senha == this.registerForm.value.senhaconfirm) {
        {/* setar user */ }
        let login = this.registerForm.get('login').value
        let senha = this.registerForm.get('senha').value
        this.admin = { login: login, senha: senha }
        this.serviceAdmin.addAdmin(this.admin).subscribe(res => {
          if (res.status !== 'Erro') {
            this.serviceAdmin.showMessage('Registro realizado com sucesso!')
            this.fecharCadastrar()
          } else {
            this.serviceAdmin.showMessage(res.msg, true)
          }
        });
      } else {
        this.serviceAdmin.showMessage('As duas senhas não conferem!', true)
      }
    } else {
      this.serviceAdmin.showMessage('Dados ausentes! - Preencha todos os campos', true)
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router,
    private serviceUser: UserService) { }

  ngOnInit(): void {
  }
  
  deslogar() {
    sessionStorage.removeItem('user');
    this.serviceUser.showMessage('Até a próxima!')
    this.router.navigate(['/login']);
  }
}

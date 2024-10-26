import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private admin:AdminService,
    private router:Router
    ){}

  showError: boolean = false;

  login(e:Event,user:string,pass:string){
    e.preventDefault();
    if(user == 'admin' && pass == 'admin')
    {
      this.admin.login();
      this.router.navigate(['admin-panel']);
    }
    else
    {
      this.showError = true;
    }
  }
}
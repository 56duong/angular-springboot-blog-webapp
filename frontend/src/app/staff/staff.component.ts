import { Component } from '@angular/core';
import { AuthService } from '../core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})

export class StaffComponent {
  menus = [
    {
      name: 'Posts',
      link: ''
    },
    {
      name: "User management",
      link: 'user-management'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  logout() {
    this.authService.removeToken();
    this.authService.removeCurrentUsername();
    this.router.navigate(['/login']);
  }
}

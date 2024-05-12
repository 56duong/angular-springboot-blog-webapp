import { Component } from '@angular/core';
import { AuthService } from '../core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent {
  currentUsername: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCurrentUsername();
  }

  getCurrentUsername() {
    this.currentUsername = this.authService.getCurrentUsername();
  }

  logout() {
    this.authService.removeToken();
    this.authService.removeCurrentUsername();
    this.router.navigate(['/login']);
  }
}

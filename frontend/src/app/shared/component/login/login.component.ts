import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  login: any = {email: '', password: ''};
  message: string = '';
  type: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.message = params['message'];
      this.type = params['type'];
    })
  }

  onLogin() {
    this.authService.removeCurrentUsername();
    this.authService.removeToken();

    this.authService.login(this.login).subscribe({
      next: (response) => {
        this.authService.setCurrentUsername(this.login.email);
        this.authService.setToken(response.token);
        this.router.navigate(["/"]);
      },
      error: (error) => {
        console.log(error);
        this.message = error.error.message;
      }
    })
  }

}

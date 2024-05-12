import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
  message: string = '';
  signupForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.message = params['message'];
    })

    this.signupForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      fullname: ['', []],
      password: ['', [
        Validators.required
      ]],
      passwordConfirm: ['', [
        Validators.required
      ]],
    }, {
      validators: this.PasswordMatchValidator('password', 'passwordConfirm')
    } as AbstractControlOptions)
  }

  PasswordMatchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if(control.value !== matchingControl.value) {
        matchingControl.setErrors({passwordMatchValidator: true});
      }
      else {
        matchingControl.setErrors(null);
      }
    }
  }

  onSignup() {
    this.authService.removeCurrentUsername();
    this.authService.removeToken();

    this.authService.signup(this.signupForm.value).subscribe({
      next: (response) => {
        this.router.navigate(["/login"], {
          queryParams: {
            message: 'Signup success',
            type: 'success'
          }
        });
      },
      error: (error) => {
        console.log(error);
        this.message = error.error.message;
      }
    })
  }
}

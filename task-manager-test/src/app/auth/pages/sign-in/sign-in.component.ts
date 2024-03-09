import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { passwordStrengthValidator } from '../../password-validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  isSubmitted = false;

  formLogin = this.fb.group({
    login: ['', [Validators.required, Validators.email]],
    password: ['', Validators.compose([
      Validators.required, passwordStrengthValidator(/\d/, { hasNumber: true }),
      passwordStrengthValidator(/[A-Z]/, { hasUpperCase: true }),
      passwordStrengthValidator(/[a-z]/, { hasLowerCase: true }),
      passwordStrengthValidator(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/, { hasSpecialCharacters: true }),
      Validators.minLength(8)]),
    ],
  });

  constructor(private fb: FormBuilder, private readonly authService: AuthService) { }

  get login() {
    return this.formLogin.controls.login;
  }

  get password() {
    return this.formLogin.controls.password;
  }

  public onSubmit(): void {
    if (this.formLogin.valid) {
      this.authService.login({ login: this.formLogin.controls.login.value !== null ? this.formLogin.controls.login.value : '' });
      localStorage.setItem('username', `${this.formLogin.value.login}`);
    }
    this.isSubmitted = true;
  }
}

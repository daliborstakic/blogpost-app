import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public loading = false;
  public failedLogin = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      ),
    ]),
  });

  usernameValidityClasses(): string {
    if (!this.loginForm.get('username')?.touched) return '';

    return !this.usernameInvalid() && this.loginForm.dirty
      ? 'is-valid'
      : 'is-invalid';
  }

  usernameInvalid(): boolean {
    return (
      (this.loginForm.get('username')!.dirty ||
        this.loginForm.get('username')!.touched) &&
      this.loginForm.get('username')!.invalid
    );
  }

  passwordValidityClasses(): string {
    if (!this.loginForm.get('password')?.touched) return '';

    return !this.passwordInvalid() && this.loginForm.dirty
      ? 'is-valid'
      : 'is-invalid';
  }

  passwordInvalid(): boolean {
    return (
      (this.loginForm.get('password')!.dirty ||
        this.loginForm.get('password')!.touched) &&
      this.loginForm.get('password')!.invalid
    );
  }

  submit() {
    this.userService
      .getUserInfoByUsername(this.loginForm.get('username')?.value)
      .subscribe((data) => {
        this.validateLogin(data);
      });
    console.log(this.loginForm.value);
  }

  validateLogin(userInfo: User) {
    if (userInfo.password !== this.loginForm.get('password')?.value) {
      this.failedLogin = true;
      return;
    }

    this.authService.login(userInfo);
    this.router.navigate(['/home']);
  }
}

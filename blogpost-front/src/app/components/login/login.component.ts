import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
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
    console.log(this.loginForm.value);
  }
}

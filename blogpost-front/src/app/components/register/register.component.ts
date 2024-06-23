import { Component } from '@angular/core';
import { User } from '../../model/user';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../model/userDTO';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  submitted = false;
  failedRegister = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
      name: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.min(1)]),
    });
  }

  fieldValidityClasses(fieldName: string) {
    if (!this.registerForm.get(fieldName)?.touched) return '';

    return !this.fieldInvalid(fieldName) && this.registerForm.dirty
      ? 'is-valid'
      : 'is-invalid';
  }

  fieldInvalid(fieldName: string) {
    return (
      (this.registerForm.get(fieldName)!.dirty ||
        this.registerForm.get(fieldName)!.touched) &&
      this.registerForm.get(fieldName)!.invalid
    );
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const newUser: UserDTO = {
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      name: this.registerForm.get('name')?.value,
      age: this.registerForm.get('age')?.value,
    };

    this.userService.createUser(newUser).subscribe((userId: number) => {
      const user: User = {
        ...newUser,
        id: userId,
      };

      this.registerForm.reset();
      this.authService.login(user);
      this.router.navigate(['/home']);
    });
  }
}

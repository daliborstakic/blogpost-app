import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  public blogpostForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [
      Validators.required,
      Validators.maxLength(150),
    ]),
  });

  controlValidityClasses(controlName: string): string {
    if (!this.blogpostForm.get(controlName)?.touched) return '';

    return !this.controlInvalid(controlName) && this.blogpostForm.dirty
      ? 'is-valid'
      : 'is-invalid';
  }

  controlInvalid(controlName: string): boolean {
    return (
      (this.blogpostForm.get(controlName)!.dirty ||
        this.blogpostForm.get(controlName)!.touched) &&
      this.blogpostForm.get(controlName)!.invalid
    );
  }

  submit() {
    console.log(this.blogpostForm.value);
    this.blogpostForm.reset();
  }
}

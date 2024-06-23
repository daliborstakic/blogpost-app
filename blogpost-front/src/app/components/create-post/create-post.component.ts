import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogpostService } from '../../services/blogpost.service';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../model/user';
import { BlogpostDTO } from '../../model/blogpostDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  private currentUser!: User | null;

  public blogpostForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [
      Validators.required,
      Validators.maxLength(1000),
    ]),
  });

  constructor(
    private blogpostService: BlogpostService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

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
    if (!this.currentUser || !this.currentUser.id) {
      console.log('User not logged in or missing ID');
      return;
    }

    const newBlogpost = new BlogpostDTO(
      this.blogpostForm.get('title')?.value,
      this.blogpostForm.get('content')?.value,
      this.currentUser.id
    );

    this.blogpostService.addBlogpost(newBlogpost).subscribe({
      next: (response) => {
        console.log('Blog post added successfully', response);
        this.blogpostForm.reset();
        this.blogpostService.reloadBlogposts();
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error adding blog post', error);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { BlogpostListComponent } from '../blogpost-list/blogpost-list.component';
import { Observable } from 'rxjs';
import { Blogpost } from '../../model/blogpost';
import { AuthenticationService } from '../../services/authentication.service';
import { BlogpostService } from '../../services/blogpost.service';
import { User } from '../../model/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-blogs',
  standalone: true,
  imports: [BlogpostListComponent, CommonModule],
  templateUrl: './user-blogs.component.html',
  styleUrl: './user-blogs.component.css',
})
export class UserBlogsComponent implements OnInit {
  public blogposts$!: Observable<Blogpost[]>;
  private currentUser!: User | null;

  constructor(
    private authService: AuthenticationService,
    private blogpostService: BlogpostService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;

    if (this.currentUser)
      this.blogposts$ = this.blogpostService.getBlogpostByUser(
        this.currentUser.id
      );
  }
}

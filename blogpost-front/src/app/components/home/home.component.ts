import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../services/blogpost.service';
import { Blogpost } from '../../model/blogpost';
import { Observable } from 'rxjs';
import { BlogpostListComponent } from '../blogpost-list/blogpost-list.component';
import { BlogpostComponent } from '../blogpost/blogpost.component';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../model/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlogpostListComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public blogposts!: Observable<Blogpost[]>;
  public userInfo: User | null;

  constructor(
    private blogpostService: BlogpostService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.blogposts = this.blogpostService.getBlogpostsObservable();
  }
}

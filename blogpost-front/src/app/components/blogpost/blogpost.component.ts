import { Component, Input } from '@angular/core';
import { Blogpost } from '../../model/blogpost';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { Observable } from 'rxjs';
import { CommentListComponent } from '../comment-list/comment-list.component';

@Component({
  selector: 'app-blogpost',
  standalone: true,
  imports: [CommentListComponent],
  templateUrl: './blogpost.component.html',
  styleUrl: './blogpost.component.css',
})
export class BlogpostComponent {
  @Input() public blogpost!: Blogpost;
  public liked = false;
  public author: User | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.blogpost && this.blogpost.userId) {
      this.userService
        .getUserInfoById(this.blogpost.userId)
        .subscribe((user: User) => {
          this.author = user;
        });
    }
  }

  toggleLike() {
    this.liked = !this.liked;
  }
}

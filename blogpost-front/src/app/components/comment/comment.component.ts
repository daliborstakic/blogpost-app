import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { Comment } from '../../model/comment';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  @Input() public comment!: Comment;
  public author: User | undefined;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.comment && this.comment.userId) {
      this.userService
        .getUserInfoById(this.comment.userId)
        .subscribe((user: User) => {
          this.author = user;
        });
    }
  }
}

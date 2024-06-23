import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { Comment } from '../../model/comment';
import { CommonModule } from '@angular/common';
import { MiniProfileComponent } from '../mini-profile/mini-profile.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, MiniProfileComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  @Input() public comment!: Comment;
  @Output() public deleteEvent: EventEmitter<number> =
    new EventEmitter<number>();
  public author: User | undefined;
  public currentUser!: User | null;

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

    this.currentUser = this.authService.currentUserValue;
  }

  deleteComment() {
    this.deleteEvent.emit(this.comment.id);
  }
}

import { AfterViewInit, Component, Input } from '@angular/core';
import { Blogpost } from '../../model/blogpost';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { AuthenticationService } from '../../services/authentication.service';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../model/comment';
import { CommonModule } from '@angular/common';
import { LikeService } from '../../services/like.service';
import { MiniProfileComponent } from '../mini-profile/mini-profile.component';

@Component({
  selector: 'app-blogpost',
  standalone: true,
  imports: [
    CommentListComponent,
    AddCommentComponent,
    CommonModule,
    MiniProfileComponent,
  ],
  templateUrl: './blogpost.component.html',
  styleUrl: './blogpost.component.css',
})
export class BlogpostComponent {
  @Input() public blogpost!: Blogpost;
  public liked!: boolean;
  public author: User | undefined;
  public currentUser!: User | null;
  public comments$: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>(
    []
  );
  public showProfile = false;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private commentService: CommentService,
    private likeService: LikeService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;

    if (this.blogpost && this.blogpost.userId) {
      this.userService
        .getUserInfoById(this.blogpost.userId)
        .subscribe((user: User) => {
          this.author = user;
        });
    }

    this.fetchComments();

    if (this.currentUser?.id !== undefined)
      this.likeService
        .isLike(this.blogpost.id, this.currentUser?.id)
        .subscribe((liked) => {
          this.liked = liked;
        });
  }

  fetchComments() {
    this.commentService
      .getCommentsByPost(this.blogpost.id)
      .subscribe((comments) => {
        this.comments$.next(comments);
      });
  }

  toggleLike() {
    this.liked = !this.liked;

    if (this.currentUser?.id === undefined) return;

    if (this.liked) {
      this.blogpost.likes++;
      this.likeService
        .likePost(this.blogpost.id, this.currentUser?.id)
        .subscribe(() => {
          console.log('The post was liked successfully!');
        });
    } else {
      this.blogpost.likes--;
      this.likeService
        .unlikePost(this.blogpost.id, this.currentUser?.id)
        .subscribe(() => {
          console.log('The post was unliked successfully!');
        });
    }
  }
}

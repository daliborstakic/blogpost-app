import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../model/comment';
import { CommentComponent } from '../comment/comment.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
  imports: [CommentComponent, CommonModule],
})
export class CommentListComponent implements OnInit {
  @Input() public comments$!: Observable<Comment[]>;
  public comments: Comment[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.comments$.subscribe((comments) => {
      this.comments = comments;
    });
  }

  onDeleteComment(commentId: number) {
    console.log(this.comments.length);

    this.commentService.deleteComment(commentId).subscribe(
      (response) => {
        console.log(response.message);
        this.comments = this.comments.filter(
          (comment) => comment.id !== commentId
        );

        console.log(this.comments.length);
      },
      (error) => {
        console.error('Error deleting comment:', error);
      }
    );
  }
}

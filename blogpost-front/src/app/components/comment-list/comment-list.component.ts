import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../model/comment';
import { CommentComponent } from '../comment/comment.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
  imports: [CommentComponent, CommonModule],
})
export class CommentListComponent implements OnInit {
  @Input() blogpostId!: number;
  comments: Comment[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.commentService
      .getCommentsByPost(this.blogpostId)
      .subscribe((comments) => {
        this.comments = comments;
      });
  }
}

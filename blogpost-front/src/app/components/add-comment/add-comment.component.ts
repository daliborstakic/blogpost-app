import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css',
})
export class AddCommentComponent {
  @Input() public blogpostId!: number;
  @Input() public userId!: number;
  @Output() public commentAdded: EventEmitter<any> = new EventEmitter<any>();

  public addCommentGroup = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });

  constructor(private commentService: CommentService) {}

  submit() {
    let content: string = this.addCommentGroup.get('comment')?.value!;

    if (!content) return;

    this.commentService
      .addComment(this.blogpostId, this.userId, content)
      .subscribe({
        next: (response) => {
          console.log('Comment added successfully!', response);
          this.commentAdded.emit();
          this.addCommentGroup.reset();
        },
        error: (error) => {
          console.error('Error adding comment!', error);
        },
      });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Comment } from '../model/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private commentsSubject = new BehaviorSubject<Comment[]>([]);

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    throw error;
  }

  getCommentsByPost(blogpostId: number): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(`/api/comments/${blogpostId}`)
      .pipe(catchError(this.handleError));
  }

  addComment(
    blogpostId: number,
    userId: number,
    content: string
  ): Observable<void> {
    return this.http
      .post<void>(`/api/comment`, { blogpostId, userId, content })
      .pipe(
        tap(() => this.reloadComments(blogpostId)),
        catchError(this.handleError)
      );
  }

  deleteComment(id: number, blogpostId: number): Observable<void> {
    return this.http.delete<void>(`/api/comment/${id}`).pipe(
      tap(() => this.reloadComments(blogpostId)),
      catchError(this.handleError)
    );
  }

  updateComments(comments: Comment[]) {
    this.commentsSubject.next(comments);
  }

  getCommentsObservable(): Observable<Comment[]> {
    return this.commentsSubject.asObservable();
  }

  reloadComments(blogpostId: number) {
    this.getCommentsByPost(blogpostId).subscribe({
      next: (comments: Comment[]) => {
        this.updateComments(comments);
      },
      error: (err) => {
        console.error('Failed to load comments', err);
      },
      complete: () => {
        console.log('Finished loading comments!');
      },
    });
  }
}

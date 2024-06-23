import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
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
    return this.http.get<Comment[]>(`/api/comments/${blogpostId}`).pipe(
      tap((comments) => {
        this.commentsSubject.next(comments);
      }),
      catchError(this.handleError)
    );
  }

  addComment(
    blogpostId: number,
    userId: number,
    content: string
  ): Observable<any> {
    return this.http
      .post<any>('/api/comment', {
        blogpostId: blogpostId,
        userId: userId,
        content: content,
      })
      .pipe(
        tap((newComment: Comment) => {
          const updatedComments = [...this.commentsSubject.value, newComment];
          this.commentsSubject.next(updatedComments);
        }),
        catchError(this.handleError)
      );
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete<any>(`/api/comment/${id}`).pipe(
      tap(() => {
        const updatedComments = this.commentsSubject.value.filter(
          (comment) => comment.id !== id
        );
        this.commentsSubject.next(updatedComments);
      }),
      catchError(this.handleError)
    );
  }

  getCommentsObservable(): Observable<Comment[]> {
    return this.commentsSubject.asObservable();
  }
}

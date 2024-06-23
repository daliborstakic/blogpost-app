import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private http: HttpClient) {}

  likePost(postId: number, userId: number): Observable<any> {
    return this.http.post('/api/like', { postId, userId });
  }

  unlikePost(postId: number, userId: number): Observable<any> {
    return this.http.delete('/api/unlike', { body: { postId, userId } });
  }

  isLike(postId: number, userId: number): Observable<boolean> {
    return this.http.post<boolean>('/api/isLiked', { postId, userId });
  }
}

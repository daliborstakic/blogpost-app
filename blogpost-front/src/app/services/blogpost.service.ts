import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Blogpost } from '../model/blogpost';
import { BlogpostDTO } from '../model/blogpostDTO';

@Injectable({
  providedIn: 'root',
})
export class BlogpostService {
  private blogpostsSubject = new BehaviorSubject<Blogpost[]>([]);

  constructor(private http: HttpClient) {
    this.reloadBlogposts();
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    throw error;
  }

  getBlogposts(): Observable<Blogpost[]> {
    return this.http
      .get<Blogpost[]>('/api/blogs')
      .pipe(catchError(this.handleError));
  }

  addBlogpost(blogpost: BlogpostDTO): Observable<any> {
    return this.http.post('/api/blog', blogpost).pipe(
      tap(() => this.reloadBlogposts()),
      catchError(this.handleError)
    );
  }

  updateBlogposts(blogposts: Blogpost[]) {
    this.blogpostsSubject.next(blogposts);
  }

  getBlogpostsObservable(): Observable<Blogpost[]> {
    return this.blogpostsSubject.asObservable();
  }

  reloadBlogposts() {
    this.getBlogposts().subscribe({
      next: (blogposts: Blogpost[]) => {
        this.updateBlogposts(blogposts);
      },
      error: (err) => {
        console.error('Failed to load blogposts', err);
      },
      complete: () => {
        console.log('Finished loading blogposts!');
      },
    });
  }
}

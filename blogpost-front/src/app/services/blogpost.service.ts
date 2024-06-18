import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Blogpost } from '../model/blogpost';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogpostService {
  private blogpostsSubject = new BehaviorSubject<Blogpost[]>([]);

  constructor(private http: HttpClient) {
    this.reloadBlogposts();
  }

  getBlogposts(): Observable<Blogpost[]> {
    return this.http.get<Blogpost[]>('api/blogposts');
  }

  addBlogpost(blogpost: Blogpost): Observable<any> {
    return this.http.post('api/blogpost', blogpost);
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
      complete: () => {
        console.log('Finished loading blogposts!');
      },
    });
  }
}

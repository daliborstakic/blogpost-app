import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public http: HttpClient) {}

  getUserInfoByUsername(username: string): Observable<User> {
    const url = `/api/users/${username}`;

    return this.http.get<User>(url).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  getUserInfoById(id: number): Observable<User> {
    const url = `/api/user/${id}`;

    return this.http.get<User>(url).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error fetching data:', error);
    return throwError(() => new Error('Error fetching data: ' + error.message));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BooksService } from '../books/books.service';

const baseUrl = 'http://localhost:8000/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

  constructor(private http: HttpClient, private bookService: BooksService) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${baseUrl}login/`, { username, password })
      .pipe(
        map(response => {
          // Handle successful login response
          localStorage.setItem('token', response.token); // Assuming token is returned from Django
          return true;
        }),
        catchError(error => {
          // Handle login error
          console.error('Login error:', error);
          return of(false);
        })
      );
  }

  signup(username: string, email: string, password: string): Observable<boolean> {
    console.log(username, email, password)
    return this.http.post<any>(`${baseUrl}signup/`, { username, email, password })
      .pipe(
        map(response => {
          console.log(response)
          // Handle successful signup response
          if (response && response.success) {
            return true;
          } else {
            return false;
          }
        }),
        catchError(error => {
          // Handle signup error
          console.error('Signup error:', error);
          return of(false);
        })
      );
  }
  addToMyList(book: any): void {
    this.bookService.addToMyList(book);
  }
  public getAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public setAuthenticated(status: boolean): void {
    this.isAuthenticated = status;
  }

  getCurrentUserId(): Observable<string> {
    return this.http.get<string>('http://localhost:8000/api/get-current-user-id');
  }
}
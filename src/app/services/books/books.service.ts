import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Books } from '../../models/books.model';

const baseUrl = 'http://localhost:8000/api/books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private userBookList: any[] = [];

  constructor(private http: HttpClient) { }

  addToMyList(book: any): void {
    this.userBookList.push(book);
  }

  getUserBookListSync(): any[] {
    return this.userBookList;
  }

  // Save book list to the backend API
  saveUserBookList(userId: string, bookList: any[]): Observable<any> {
    return this.http.post(`/api/user/${userId}/booklist`, { bookList });
  }
  getBooks(): Observable<Books[]> {
    return this.http.get<Books[]>(baseUrl);
  }


 
}

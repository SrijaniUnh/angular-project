import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BooksService } from '../../services/books/books.service';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css']
})
export class SearchBooksComponent {
  bookName: string = '';
  searchResults: any[] | undefined;

  constructor(private http: HttpClient, private bookService: BooksService) {}

  searchBooks(): void {
    this.http.get<any[]>('http://localhost:8000/api/search-books', { params: { query: this.bookName } })
      .subscribe(
        results => {
          if (Array.isArray(results)) {
            this.searchResults = results;
          } else {
            // Handle case where results is not an array
            console.error('Search error: Invalid data format');
          }
        },
        error => {
          console.error('Search error:', error);
        }
      );
  
  }
  addToMyList(book: any): void {
    this.bookService.addToMyList(book);
  }
}


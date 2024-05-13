import { Component, OnInit } from '@angular/core';
import { Books } from '../../models/books.model';
import { BooksService } from '../../services/books/books.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Books[] = [];
  userBookList: any[] = [];

  constructor(private booksService: BooksService, private authService: AuthService) { 
    this.userBookList = this.booksService.getUserBookListSync();
  }

  ngOnInit(): void {
    
  }

  
  getBooks(): void {
    this.booksService.getBooks()
      .subscribe(books => this.books = books);
  }
}

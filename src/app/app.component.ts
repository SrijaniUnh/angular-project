import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { BehaviorSubject } from 'rxjs'; // Import BehaviorSubject

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'book_management_system';
  isAuthenticated$ = new BehaviorSubject<boolean>(false); // Use BehaviorSubject

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated$.next(this.authService.getAuthenticated()); // Set initial value
  }

  // Add a method to update isAuthenticated$ on login/logout events (optional)
  updateIsAuthenticated(status: boolean) {
    this.isAuthenticated$.next(status);
  }
}

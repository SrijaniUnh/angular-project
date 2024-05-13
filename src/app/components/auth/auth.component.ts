import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Signup } from '../../models/auth/signup.model';
import { Login } from '../../models/auth/login.model';
import { Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  signupData: Signup = {
    username: '',
    email: '',
    password: ''
  };

  loginData: Login = {
    username: '',
    password: ''
  };

  showSignupForm: boolean = false; // Initialize showSignupForm property
  currentUserId: string | null = null;
  constructor(private authService: AuthService, private router: Router) { }

  signin(): void {
    
    this.authService.login(this.loginData.username, this.loginData.password)
    .subscribe(
      success => {
        if (success) {
          this.authService.setAuthenticated(true);
          //this.currentUsername = response.username;
          this.router.navigate(['/app']);
        } else {
          // Handle login failure
        }
      }
    );
  }

  signup(): void {
    this.authService.signup(this.signupData.username, this.signupData.email, this.signupData.password)
      .subscribe(
        success => {
          if (success) {
            this.authService.setAuthenticated(true);
            this.router.navigate(['/login']);
          } else {
            // Handle signup failure
            console.error('Signup failed');
          }
        },
        error => {
          // Handle signup error
          console.error('Signup error:', error);
        }
      );
  }

  toggleSignupForm(): void { // Method to toggle the showSignupForm property
    this.showSignupForm = !this.showSignupForm;
  }
}

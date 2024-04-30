import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
    this.authService.userAuthenticated$.subscribe(isAuthenticated => {
      this.userAuthenticated = isAuthenticated;
    });
    this.authService.userData$.subscribe(userData => {
      this.user = userData;
      console.log("user data", this.user);
    })
  }

  userAuthenticated: boolean = false;
  user: any;

  loginButton() {
    this.router.navigate(['./login']);
  }

  signUpButton() {
    this.router.navigate(['./signup']);
  }

  logoutUser() {
    this.authService.logoutUser((response) => {
      console.log("response", response);
      if (response.success) {
        this.router.navigate(['./']);
      } else {
        this.snackBar.open('Error logging user out!', 'Close', {
          duration: 6000,
        })
      }
    });
  }
}

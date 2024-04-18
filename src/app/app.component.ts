import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router, private BreakpointObserver: BreakpointObserver, private authService: AuthService, private snackBar: MatSnackBar) {
    this.authService.userAuthenticated$.subscribe(isAuthenticated => {
      this.userAuthenticated = isAuthenticated;
    });
    this.authService.userData$.subscribe(userData => {
      this.user = userData;
      console.log("user data", this.user);
    })
  }

  title = 'cookr-app';
  userAuthenticated: boolean = false;
  user: any;

  ngOnInit() {
    console.log("does this work?", this.authService.userData$);

    this.authService.checkUserAuthStatus();
  }

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
        this.snackBarError('Error logging user out!');
      }
    });
  }

  snackBarError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
    })
  }

  navUserProfile() {
    this.router.navigate(['./user/' + this.user.uid])
  }
}

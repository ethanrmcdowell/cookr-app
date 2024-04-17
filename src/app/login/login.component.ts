import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  email: string = "";
  password: string = "";

  loginUser() {
    this.authService.loginUser(this.email, this.password, async (response) => {
      if (response.success) {
        console.log("SUCCESSFULLY LOGGED IN!");
        console.log("user credentials", response);
        this.router.navigate(['./user/' + response.id])
      } else {
        console.log("FAILED TO LOG IN!");
      }
    })
  }
}

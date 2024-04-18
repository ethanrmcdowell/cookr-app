import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  email: string = "";
  password: string = "";

  async loginUser() {
    await this.authService.loginUser(this.email, this.password, async (response) => {
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

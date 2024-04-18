import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  constructor(private authService: AuthService) {}

  passReset = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  resetClicked: boolean = false;
  userEmail: string = "";

  resetPassword() {
    let emailReset = this.passReset.get("email")?.value ?? "";
    this.authService.passwordReset(emailReset, async (response) => {
      console.log("response", response);
      if (response.success) {
        this.userEmail = emailReset;
        this.resetClicked = true;
      }
    });
  }
}

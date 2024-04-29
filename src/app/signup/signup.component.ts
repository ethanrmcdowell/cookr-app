import { Component } from '@angular/core';
import { FormGroup, FormsModule, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  newUserForm = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  async signupUser() {
    let display: string = this.newUserForm.get("displayName")?.value ?? '';
    let email: string = this.newUserForm.get("email")?.value ?? '';
    let pass: string = this.newUserForm.get("password")?.value ?? '';
    let pass2: string = this.newUserForm.get("password2")?.value ?? '';
    
    if (pass !== pass2) {
      this.snackBarError('Passwords do not match!');
      return;
    } else if (!this.newUserForm.controls.email.valid) {
      this.snackBarError('Invalid e-mail address!');
      return;
    } else if (!this.newUserForm.controls.password.valid) {
      this.snackBarError('Password must be at least 8 characters long!');
      return;
    } else if (!this.newUserForm.controls.displayName.valid) {
      this.snackBarError('Please enter a valid display name.');
      return;
    }

    await this.authService.signupUser(email, pass, display, async (response) => {
      let resMessage = response.message;
      console.log(resMessage);
      if (response.success) {
        this.router.navigate(['./user/' + response.id]);;
      } else {
        if (resMessage === 'auth/email-already-in-use') {
          this.snackBarError('E-mail address already in use!');
        } else {
          this.snackBarError('Error registering new user.');
        }
      }
    })
  }

  snackBarError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
    })
  }
}

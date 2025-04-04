import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  name = '';
  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService) {}

  signup() {
    if (!this.name || !this.username || !this.password) {
      this.message = 'All fields are required!';
      return;
    }

    if (this.authService.signup(this.username, this.password, this.name)) {
      this.message = 'Signup successful! You can now login.';
    } else {
      this.message = 'Username already exists!';
    }
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  signup() {
    if (!this.name || !this.username || !this.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'All fields are required!',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    if (this.authService.signup(this.username, this.password, this.name)) {
      Swal.fire({
        icon: 'success',
        title: 'Signup Successful!',
        text: 'You can now login.',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        this.router.navigate([`/login`]);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: 'Username already exists!',
        confirmButtonColor: '#d33',
      });
    }
  }
}

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  loggedInUser: any = null;

  constructor(private authService: AuthService, private router: Router) {
    this.loadUserData();
  }

  loadUserData() {
    const username = this.authService.getLoggedInUser();
    if (username) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      this.loggedInUser = users.find((user: any) => user.username === username);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

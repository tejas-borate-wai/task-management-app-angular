import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  signup(username: string, password: string, name: string): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some((user: any) => user.username === username)) {
      return false;
    }

    // Add new user
    users.push({ username, password, name });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // Find the user
    let user = users.find(
      (user: any) => user.username === username && user.password === password
    );
    if (user) {
      localStorage.setItem('loggedInUser', username);
      return true;
    }
    return false;
  }

  // Get currently logged-in user
  getLoggedInUser(): string | null {
    return localStorage.getItem('loggedInUser');
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('loggedInUser');
  }
}

import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

@Component({
  selector: 'app-add-project',
  imports: [NavbarComponent, FormsModule, RouterModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
})
export class AddProjectComponent {
  project = {
    id: '', // Unique ID
    title: '',
    description: '',
    createdBy: '',
    projectManager: '',
    startDate: '',
    endDate: '',
    teamMembers: '',
    creationDate: '',
    dueDate: '',
  };

  constructor(private router: Router) {}

  ngOnInit() {
    const loggedInUsername = localStorage.getItem('loggedInUser');

    if (loggedInUsername) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const currentUser = users.find(
        (user: any) => user.username === loggedInUsername
      );
      console.log('Current User:', currentUser);

      if (currentUser) {
        this.project.createdBy = currentUser.username; // Set the logged-in user's name
      }
    }

    this.project.creationDate = new Date().toISOString().split('T')[0];
  }
  calculateDueDate() {
    if (this.project.startDate && this.project.endDate) {
      const start = new Date(this.project.startDate);
      const end = new Date(this.project.endDate);

      const timeDiff = end.getTime() - start.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      this.project.dueDate = dayDiff > 0 ? dayDiff.toString() : '0';
    }
  }

  saveProject() {
    this.project.id = uuidv4(); // Generate unique ID
    this.calculateDueDate();
    let projects = JSON.parse(localStorage.getItem('projects') || '[]');
    projects.push(this.project);
    localStorage.setItem('projects', JSON.stringify(projects));

    alert('Project Added Successfully!');
    this.router.navigate(['/']);
  }
}

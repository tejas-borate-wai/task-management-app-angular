import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, CommonModule, NavbarComponent, ProjectCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
})
export class DashboardComponent implements OnInit {
  loggedInUser: string | null = '';
  projects: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();

    if (!this.loggedInUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadProjects();
  }

  loadProjects() {
    const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    // Filter projects created by the logged-in user
    this.projects = storedProjects.filter(
      (project: any) => project.createdBy === this.loggedInUser
    );
  }

  removeProject(projectId: string) {
    this.projects = this.projects.filter((p) => p.id !== projectId);
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }
}

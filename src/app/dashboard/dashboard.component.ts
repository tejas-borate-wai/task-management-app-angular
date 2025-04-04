import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterModule,
    CommonModule,
    NavbarComponent,
    ProjectCardComponent,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
})
export class DashboardComponent implements OnInit {
  loggedInUser: string | null = '';
  projects: any[] = [];
  searchQuery: string = '';
  filteredProjects: any[] = []; // for displaying search results

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
    this.projects = storedProjects.filter(
      (project: any) => project.createdBy === this.loggedInUser
    );
    this.filteredProjects = [...this.projects]; // initial view = all
  }

  filterProjects() {
    const query = this.searchQuery.toLowerCase();
    this.filteredProjects = this.projects.filter((project) =>
      project.title.toLowerCase().includes(query)
    );
  }

  removeProject(projectId: string) {
    this.projects = this.projects.filter((p) => p.id !== projectId);
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  sortAscending = true;

  sortProjects(field: string, order: string) {
    if (!field || field === 'Select') return;

    this.filteredProjects.sort((a: any, b: any) => {
      let valA = a[field];
      let valB = b[field];

      // Convert to Date if needed
      if (
        field === 'creationDate' ||
        field === 'startDate' ||
        field === 'endDate'
      ) {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      } else {
        valA = valA?.toString().toLowerCase();
        valB = valB?.toString().toLowerCase();
      }

      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
}

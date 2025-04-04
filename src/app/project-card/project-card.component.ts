import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  @Input() project: any;

  constructor(private router: Router) {}

  viewProjectDetails() {
    this.router.navigate(['/project-details', this.project.id]);
  }

  editProject(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/edit-project', this.project.id]);
  }

  deleteProject(event: Event) {
    event.stopPropagation();

    // Show a confirmation dialog
    const confirmDelete = confirm(
      'Are you sure you want to delete this project?'
    );

    if (confirmDelete) {
      let projects = JSON.parse(localStorage.getItem('projects') || '[]');
      projects = projects.filter((p: any) => p.id !== this.project.id);
      localStorage.setItem('projects', JSON.stringify(projects));

      window.location.reload();
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  @Input() project: any;
  @Output() projectDeleted = new EventEmitter<string>();

  constructor(private router: Router) {}

  viewProjectDetails() {
    this.router.navigate(['/project-details', this.project.id]);
  }

  editProject(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/edit-project', this.project.id]);
  }

  deleteProject(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    Swal.fire({
      title: 'Are you sure?',
      text: 'This project will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        let projects = JSON.parse(localStorage.getItem('projects') || '[]');
        projects = projects.filter((p: any) => p.id !== this.project.id);
        localStorage.setItem('projects', JSON.stringify(projects));

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The project has been deleted.',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          this.projectDeleted.emit(this.project.id);
        });
      }
    });
  }
}

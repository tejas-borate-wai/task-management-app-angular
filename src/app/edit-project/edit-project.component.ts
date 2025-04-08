import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  project: any = {};

  constructor(private route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    this.project = projects.find((p: any) => p.id === projectId) || {};
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
    let projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const index = projects.findIndex((p: any) => p.id === this.project.id);

    if (index !== -1) {
      projects[index] = this.project;
      localStorage.setItem('projects', JSON.stringify(projects));

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Project updated successfully.',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        this.router.navigate(['/']);
      });
    }
  }
}

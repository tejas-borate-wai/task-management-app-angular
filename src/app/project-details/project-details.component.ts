import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    RouterModule,
    TaskDetailsComponent,
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
})
export class ProjectDetailsComponent implements OnInit {
  project: any;
  allTasks: any[] = [];
  projectRelatedTasks: any[] = [];
  filteredTasks: any[] = [];

  selectedSortField: string = 'Select';
  selectedSortOrder: string = 'asc';
  searchTaskQuery: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    this.project = projects.find((p: any) => p.id === projectId);

    this.loadTasks();
  }

  loadTasks() {
    const projectId = this.route.snapshot.paramMap.get('id');
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.allTasks = allTasks.filter(
      (task: any) => task.projectId === projectId
    );
    this.projectRelatedTasks = [...this.allTasks];
    this.filteredTasks = [...this.allTasks];
  }

  handleTaskDeleted(taskId: string) {
    let allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    allTasks = allTasks.filter((task: any) => task.taskId !== taskId);
    localStorage.setItem('tasks', JSON.stringify(allTasks));

    this.projectRelatedTasks = this.projectRelatedTasks.filter(
      (task) => task.taskId !== taskId
    );
    this.allTasks = this.allTasks.filter((task) => task.taskId !== taskId);
    this.filteredTasks = this.filteredTasks.filter(
      (task) => task.taskId !== taskId
    );
  }

  // filterTasksBySearch() {
  //   const query = this.searchTaskQuery.toLowerCase().trim();

  //   this.filteredTasks = this.projectRelatedTasks.filter((task) =>
  //     task.title.toLowerCase().includes(query)
  //   );

  //   this.sortTasks(this.selectedSortField, this.selectedSortOrder); // sort after filtering
  // }

  // sortTasks(field: string, order: string) {
  //   if (!field) return; // Prevent sorting on empty selection

  //   this.filteredTasks.sort((a: any, b: any) => {
  //     const valA = a[field]?.toString().toLowerCase() || '';
  //     const valB = b[field]?.toString().toLowerCase() || '';

  //     if (valA < valB) return order === 'asc' ? -1 : 1;
  //     if (valA > valB) return order === 'asc' ? 1 : -1;
  //     return 0;
  //   });
  // }

  // filterTasksByStatus(status: string) {
  //   if (status === 'all') {
  //     this.projectRelatedTasks = [...this.allTasks];
  //   } else {
  //     this.projectRelatedTasks = this.allTasks.filter(
  //       (task) => task.status === status
  //     );
  //   }

  //   this.filterTasksBySearch(); // re-filter search + sort
  // }

  filterTasksByStatus(status: string) {
    if (status === 'all') {
      this.projectRelatedTasks = [...this.allTasks];
    } else {
      this.projectRelatedTasks = this.allTasks.filter(
        (task) => task.status === status
      );
    }

    this.refreshTasks(); // apply search + sort again
  }

  filterTasksBySearch() {
    this.refreshTasks(); // just trigger everything from here
  }

  sortTasks(field: string, order: string) {
    this.refreshTasks(); // sort is now part of the same pipeline
  }

  refreshTasks() {
    // Step 1: Search filter
    const query = this.searchTaskQuery.toLowerCase().trim();
    let result = this.projectRelatedTasks.filter((task) =>
      task.title.toLowerCase().includes(query)
    );

    // Step 2: Sorting
    if (this.selectedSortField !== 'Select' && this.selectedSortField !== '') {
      result.sort((a: any, b: any) => {
        let valA = a[this.selectedSortField]?.toString().toLowerCase() || '';
        let valB = b[this.selectedSortField]?.toString().toLowerCase() || '';

        if (valA < valB) return this.selectedSortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return this.selectedSortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.filteredTasks = result;
  }
}

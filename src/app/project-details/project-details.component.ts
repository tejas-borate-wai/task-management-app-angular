import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-project-details',
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
  projectRelatedTasks: any[] = [];

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
    this.projectRelatedTasks = allTasks.filter(
      (task: any) => task.projectId === projectId
    );
  }

  handleTaskDeleted(taskId: string) {
    let allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    allTasks = allTasks.filter((task: any) => task.taskId !== taskId);
    localStorage.setItem('tasks', JSON.stringify(allTasks));

    this.projectRelatedTasks = this.projectRelatedTasks.filter(
      (task) => task.taskId !== taskId
    );
  }
}

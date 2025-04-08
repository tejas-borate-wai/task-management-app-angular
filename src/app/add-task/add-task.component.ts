import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule, FormsModule, NavbarComponent, RouterLink],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  taskDetails = {
    taskId: this.generateUniqueId(), // Generate unique ID
    projectId: '',
    title: '',
    assignedTo: '',
    status: '',
    assignedUser: '',
    estimate: '',
    timeSpent: '',
  };

  ngOnInit() {
    this.taskDetails.projectId = this.route.snapshot.paramMap.get('id') ?? '';
    // console.log(this.taskDetails.projectId);
  }
  saveTask() {
    this.taskDetails.projectId = this.route.snapshot.paramMap.get('id') ?? '';
    console.log(this.taskDetails);
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(this.taskDetails);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    alert('Task Added Successfully!');
    this.router.navigate([`/project-details/${this.taskDetails.projectId}`]);
  }

  private generateUniqueId(): string {
    return 'task-' + Math.random().toString(36).substr(2, 9);
  }
}

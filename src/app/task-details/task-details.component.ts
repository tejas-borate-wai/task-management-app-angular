import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
})
export class TaskDetailsComponent {
  @Input() task: any; // Receiving task from parent component
  @Input() projectName: any;
  @Output() taskDeleted = new EventEmitter<string>(); // Emit event on delete

  getStatusClass(priority: string): string {
    switch (priority) {
      case 'High':
        return 'bg-danger text-white';
      case 'Medium':
        return 'bg-warning text-dark';
      case 'Low':
        return 'bg-success text-white';
      default:
        return 'bg-secondary text-white';
    }
  }

  deleteTask(event: Event) {
    event.stopPropagation();
    const confirmDelete = confirm('Are you sure you want to delete this Task?');
    if (confirmDelete) {
      let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks = tasks.filter((t: any) => t.taskId !== this.task.taskId);
      localStorage.setItem('tasks', JSON.stringify(tasks));

      this.taskDeleted.emit(this.task.taskId); // Notify parent to update UI
    }
  }
}

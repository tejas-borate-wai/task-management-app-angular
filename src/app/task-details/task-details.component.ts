import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

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

    Swal.fire({
      title: 'Are you sure?',
      text: 'This task will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter((t: any) => t.taskId !== this.task.taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The task has been deleted.',
          confirmButtonColor: '#3085d6',
        });

        this.taskDeleted.emit(this.task.taskId); // Notify parent to update UI
      }
    });
  }
}

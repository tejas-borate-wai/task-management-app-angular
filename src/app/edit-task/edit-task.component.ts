import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-task',
  imports: [FormsModule, CommonModule, RouterModule, NavbarComponent],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent implements OnInit {
  taskId!: string;
  taskDetails: any = {
    title: '',
    assignedTo: '',
    status: '',
    estimate: '',
    timeSpent: '',
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('id') || '';
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    let task = tasks.find((t: any) => t.taskId === this.taskId);
    console.log(task);

    if (task) {
      this.taskDetails = { ...task };
    }
  }

  updateTask() {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    let taskIndex = tasks.findIndex((t: any) => t.taskId === this.taskId);

    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...this.taskDetails, taskId: this.taskId };
      localStorage.setItem('tasks', JSON.stringify(tasks));

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Task updated successfully.',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        this.router.navigate(['/project-details', tasks[taskIndex].projectId]);
      });
    }
  }
}

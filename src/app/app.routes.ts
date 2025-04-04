import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'add-project', component: AddProjectComponent },
  { path: 'project-details/:id', component: ProjectDetailsComponent },
  { path: 'add-task/:id', component: AddTaskComponent },
  { path: 'edit-project/:id', component: EditProjectComponent },
  { path: 'edit-task/:id', component: EditTaskComponent },
];

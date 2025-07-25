import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NAVIGATION_LIST } from '../../shared/variables/navigationRoutes';
import { NewProjectComponent } from './new-project/new-project.component';

import { TaskMainComponent } from './task-main/task-main.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { ProjectMainComponent } from './project-main/project-main.component';

const projectRoutes: Routes = [
  {
    // new project
    path: NAVIGATION_LIST[4].moduleRoutes[0].relativePathInModule,
    component: NewProjectComponent,
    title: NAVIGATION_LIST[4].moduleRoutes[0].title,
  },
  {
    // project details
    path: NAVIGATION_LIST[4].moduleRoutes[1].relativePathInModule,
    component: ProjectMainComponent,
    title: NAVIGATION_LIST[4].moduleRoutes[1].title,
  },
  {
    // new task
    path: NAVIGATION_LIST[4].moduleRoutes[2].relativePathInModule,
    component: NewTaskComponent,
    title: NAVIGATION_LIST[4].moduleRoutes[2].title,
  },

  {
    // task details
    path: NAVIGATION_LIST[4].moduleRoutes[3].relativePathInModule,
    component: TaskMainComponent,
    title: NAVIGATION_LIST[4].moduleRoutes[3].title,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NewProjectComponent,
    TaskMainComponent,
    NewTaskComponent,
    RouterModule.forChild(projectRoutes),
    ProjectMainComponent,
  ],
})
export class ProjectModule {}

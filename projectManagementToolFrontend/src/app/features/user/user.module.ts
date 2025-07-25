import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserStartComponent } from './user-start/user-start.component';
import { NAVIGATION_LIST } from '../../shared/variables/navigationRoutes';

const userRoutes: Routes = [
  {
    path: NAVIGATION_LIST[2].moduleRoutes[0].relativePathInModule,
    component: UserStartComponent,
    title: NAVIGATION_LIST[2].moduleRoutes[0].title,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(userRoutes)],
})
export class UserModule {}

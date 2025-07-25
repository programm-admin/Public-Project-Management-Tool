import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KatanaStartComponent } from './katana-start/katana-start.component';
import { RouterModule, Routes } from '@angular/router';
import { NAVIGATION_LIST } from '../../shared/variables/navigationRoutes';

const katanaRoutes: Routes = [
  {
    path: NAVIGATION_LIST[5].moduleRoutes[0].relativePathInModule,
    component: KatanaStartComponent,
    title: NAVIGATION_LIST[5].moduleRoutes[0].title,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    KatanaStartComponent,
    RouterModule.forChild(katanaRoutes),
  ],
})
export class KatanaModule {}

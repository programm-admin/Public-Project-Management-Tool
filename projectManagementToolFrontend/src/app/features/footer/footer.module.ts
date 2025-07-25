import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { RouterModule, Routes } from '@angular/router';
import { NAVIGATION_LIST } from '../../shared/variables/navigationRoutes';

const footerRoutes: Routes = [
  {
    // about
    path: NAVIGATION_LIST[3].moduleRoutes[0].relativePathInModule,
    component: AboutComponent,
    title: NAVIGATION_LIST[3].moduleRoutes[0].title,
  },
  {
    // impressum
    path: NAVIGATION_LIST[3].moduleRoutes[1].relativePathInModule,
    component: ImpressumComponent,
    title: NAVIGATION_LIST[3].moduleRoutes[1].title,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AboutComponent,
    ImpressumComponent,
    RouterModule.forChild(footerRoutes),
  ],
})
export class FooterModule {}

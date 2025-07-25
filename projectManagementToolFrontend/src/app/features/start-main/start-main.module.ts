import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { RouterModule, Routes } from '@angular/router';
import { NAVIGATION_LIST } from '../../shared/variables/navigationRoutes';

const startRoutes: Routes = [
    {
        path: NAVIGATION_LIST[0].moduleRoutes[0].relativePathInModule,
        component: StartComponent,
        title: NAVIGATION_LIST[0].moduleRoutes[0].title,
    },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, StartComponent, RouterModule.forChild(startRoutes)],
})
export class StartMainModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NAVIGATION_LIST } from '../../shared/variables/navigationRoutes';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../../guards/auth/auth.guard';

const authRoutes: Routes = [
    {
        // login
        path: NAVIGATION_LIST[1].moduleRoutes[0].relativePathInModule,
        component: LoginComponent,
        title: NAVIGATION_LIST[1].moduleRoutes[0].title,
        canActivate: [AuthGuard],
    },
    {
        // register
        path: NAVIGATION_LIST[1].moduleRoutes[1].relativePathInModule,
        component: RegisterComponent,
        title: NAVIGATION_LIST[1].moduleRoutes[1].title,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(authRoutes),
        LoginComponent,
        RegisterComponent,
    ],
})
export class AuthenticationModule {}

import { Routes } from '@angular/router';
import { NAVIGATION_LIST } from './shared/variables/navigationRoutes';
import { StartComponent } from './features/start-main/start/start.component';
import { AuthGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
    {
        path: NAVIGATION_LIST[0].modulePath,
        component: StartComponent,
    },

    {
        // auth route
        path: NAVIGATION_LIST[1].modulePath,
        loadChildren: () =>
            import('./features/authentication/authentication.module').then(
                (m) => m.AuthenticationModule
            ),
    },
    {
        // user route
        path: NAVIGATION_LIST[2].modulePath,
        loadChildren: () =>
            import('./features/user/user.module').then((m) => m.UserModule),
        canActivate: [AuthGuard],
    },
    {
        // app footer
        path: NAVIGATION_LIST[3].modulePath,
        loadChildren: () =>
            import('./features/footer/footer.module').then(
                (m) => m.FooterModule
            ),
    },
    {
        path: NAVIGATION_LIST[4].modulePath,
        loadChildren: () =>
            import('./features/project/project.module').then(
                (m) => m.ProjectModule
            ),
        canActivate: [AuthGuard],
    },
    {
        path: NAVIGATION_LIST[5].modulePath,
        loadChildren: () =>
            import('./features/katana/katana.module').then(
                (m) => m.KatanaModule
            ),
        title: NAVIGATION_LIST[5].moduleTitle,
    },
];

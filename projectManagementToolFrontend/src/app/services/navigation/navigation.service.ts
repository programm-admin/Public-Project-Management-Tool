import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NAVIGATION_LIST } from '../../shared/variables/navigationRoutes';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    constructor(private router: Router) {}

    navigateToLoginPage = () => {
        this.router.navigateByUrl(NAVIGATION_LIST[1].moduleRoutes[0].fullPath);
    };

    public navigateToCurrentProjectPage = (projectID: string) => {
        this.router.navigateByUrl(`/project/${projectID}`);
    };
}

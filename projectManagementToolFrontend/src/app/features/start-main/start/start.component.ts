import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {
    getNavigationListRoutesOnly,
    NAVIGATION_LIST,
    navigationRoute,
} from '../../../shared/variables/navigationRoutes';
import { NavigationService } from '../../../services/navigation/navigation.service';
import { UserAccountService } from '../../../services/user/user-account.service';
import { User } from '../../../shared/interfaces/User';

@Component({
    selector: 'app-start',
    standalone: true,
    imports: [RouterModule, CommonModule, ButtonModule],
    templateUrl: './start.component.html',
    styleUrl: './start.component.css',
})
export class StartComponent implements OnInit {
    public siteList: navigationRoute[] = getNavigationListRoutesOnly();
    public isUserLoggedIn: boolean = false;
    public currentUser: User | null = null;
    public navigationList = NAVIGATION_LIST;

    constructor(
        public navigationService: NavigationService,
        private userAccountService: UserAccountService,
        public router: Router
    ) {}

    ngOnInit(): void {
        this.userAccountService.isLoggedIn$.subscribe((status: boolean) => {
            this.isUserLoggedIn = status;
        });

        this.userAccountService.currentUser$.subscribe((user: User | null) => {
            this.currentUser = user;
        });
    }

    public navigateToProjectsPage = () => {
        this.router.navigateByUrl(
            this.navigationList[2].moduleRoutes[0].fullPath
        );
    };
}

import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import {
    Component,
    Inject,
    inject,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import {
    getNavigationListRoutesOnly,
    NAVIGATION_LIST,
    NAVIGATION_ROUTES,
    navigationRoute,
} from '../../shared/variables/navigationRoutes';
import { UserAccountService } from '../../services/user/user-account.service';

import {
    StylesConfiguration,
    StylingService,
} from '../../services/styling/styling.service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { User } from '../../shared/interfaces/User';
import { ComponentService } from '../../services/component/component.service';
import { fromEvent, map, Subscription } from 'rxjs';
import { WINDOW_WIDTH_LIMIT } from '../../shared/variables/window-width-limit';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, CommonModule, ButtonModule, TooltipModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
    isLoggedIn: boolean = true;
    navigationRoutesList: string[][] = NAVIGATION_ROUTES;
    navigationList: navigationRoute[] = getNavigationListRoutesOnly();
    displayedUserName: string = '';
    stylesConfig: StylesConfiguration | undefined;

    private windowSubscription!: Subscription;
    public windowWidth: number = 1000;
    public WINDOW_LIMIT: number = WINDOW_WIDTH_LIMIT;

    constructor(
        private router: Router,
        private stylesService: StylingService,
        public userAccountService: UserAccountService,
        private componentService: ComponentService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    ngOnInit() {
        this.userAccountService.currentUser$.subscribe(
            (userObject: User | null) => {
                this.displayedUserName = userObject
                    ? userObject.userName
                    : 'keiner Vorhanden';
            }
        );

        this.stylesConfig = this.stylesService.getStylesConfiguration();

        if (isPlatformBrowser(this.platformId)) {
            this.windowWidth = window.innerWidth;
            this.windowSubscription = fromEvent(window, 'resize')
                .pipe(map(() => window.innerWidth))
                .subscribe((width: number) => (this.windowWidth = width));
        }
    }

    ngOnDestroy(): void {
        if (this.windowSubscription) {
            this.windowSubscription.unsubscribe();
        }
    }

    logOutUser = () => {
        localStorage.clear(); // removing everything

        window.alert('Sie wurden erfolgreich ausgeloggt.');
        this.router.navigateByUrl('/');
    };

    navigateToLoginPage = () => {
        this.router.navigateByUrl(NAVIGATION_LIST[2].moduleRoutes[0].fullPath);
    };

    public toggleSidebar = (status: boolean) => {
        this.componentService.updateIsSidebarOpenSubject(status);
    };
}

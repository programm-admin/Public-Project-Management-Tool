import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { NAVIGATION_LIST } from '../../shared/variables/navigationRoutes';
import {
    LOCAL_STORAGE_USER_ACCOUNT_ID,
    LOCAL_STORAGE_USER_AUTH_TOKEN,
    LOCAL_STORAGE_USER_NAME,
} from '../../shared/interfaces/CredentialsInterface';
import { User } from '../../shared/interfaces/User';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private noAccessSubject: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);
    public noAccessSubject$: Observable<boolean> =
        this.noAccessSubject.asObservable();

    private noAccessDueToNotLoggedInSubject: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);
    public noAccessDueToNotLoggedInSubject$: Observable<boolean> =
        this.noAccessDueToNotLoggedInSubject.asObservable();

    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    public isUserLoggedIn = (): boolean => {
        return (
            isPlatformBrowser(this.platformId) &&
            !!localStorage.getItem(LOCAL_STORAGE_USER_AUTH_TOKEN) &&
            localStorage.getItem(LOCAL_STORAGE_USER_AUTH_TOKEN)!.length > 0 &&
            !!localStorage.getItem(LOCAL_STORAGE_USER_ACCOUNT_ID) &&
            localStorage.getItem(LOCAL_STORAGE_USER_ACCOUNT_ID)!.length > 0 &&
            !!localStorage.getItem(LOCAL_STORAGE_USER_NAME) &&
            localStorage.getItem(LOCAL_STORAGE_USER_NAME)!.length > 0
        );
    };

    public getUser = (): User | null => {
        if (isPlatformBrowser(this.platformId)) {
            const userNameFromToken: string | null = localStorage.getItem(
                LOCAL_STORAGE_USER_NAME
            );
            const authTokenFromToken: string | null = localStorage.getItem(
                LOCAL_STORAGE_USER_AUTH_TOKEN
            );
            const userAccountIDFromToken: string | null = localStorage.getItem(
                LOCAL_STORAGE_USER_ACCOUNT_ID
            );

            if (
                !userNameFromToken ||
                !authTokenFromToken ||
                !userAccountIDFromToken
            ) {
                return null;
            }

            return {
                userName: userNameFromToken,
                authToken: authTokenFromToken,
                userAccountID: userAccountIDFromToken,
            };
        }

        return null;
    };

    /**
     * Function for updating the behaviour subject for no access for showing the no access error message.
     * @param status boolean
     */
    public updateNoAccessSubject = (status: boolean) => {
        this.noAccessSubject.next(status);
    };

    public updatenoAccessDueToNotLoggedInSubject = (status: boolean) => {
        this.noAccessDueToNotLoggedInSubject.next(status);
    };

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        // Überprüfen, ob wir im Browser sind, bevor wir localStorage verwenden
        if (!this.isUserLoggedIn()) {
            if (state.url.startsWith('/user')) {
                this.router.navigateByUrl(
                    NAVIGATION_LIST[1].moduleRoutes[0].fullPath
                );

                this.updatenoAccessDueToNotLoggedInSubject(true);

                return false;
            }
            return true;
        } else {
            // user is logged in
            if (state.url.startsWith(`/${NAVIGATION_LIST[1].modulePath}`)) {
                this.router.navigateByUrl('');

                // for showing no access message
                // this.userAccountService.updateNoAccessSubject(true);
                this.updateNoAccessSubject(true);

                return false;
            }
            return true;
        }
    }
}

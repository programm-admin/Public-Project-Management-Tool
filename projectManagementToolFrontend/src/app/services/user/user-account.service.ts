import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AUTHENTICATION_ROUTES } from '../../shared/variables/authenticationRoutes';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { AuthenticationResponse } from '../../shared/interfaces/AuthenticationResponse';
import { Router } from '@angular/router';
import { NAVIGATION_LIST } from '../../shared/variables/navigationRoutes';
import {
    BehaviorSubject,
    catchError,
    Observable,
    shareReplay,
    tap,
    throwError,
} from 'rxjs';
import { User } from '../../shared/interfaces/User';
import { isPlatformBrowser } from '@angular/common';
import {
    Credentials,
    LOCAL_STORAGE_USER_AUTH_TOKEN,
} from '../../shared/interfaces/CredentialsInterface';
import { AuthGuard } from '../../guards/auth/auth.guard';

@Injectable({
    providedIn: 'root',
})
export class UserAccountService {
    private userAccountID: string = '';

    private currentUserSubject: BehaviorSubject<User | null> =
        new BehaviorSubject<User | null>(null);
    public currentUser$: Observable<User | null> =
        this.currentUserSubject.asObservable();

    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    public isLoggedIn$ = this.isLoggedInSubject.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object,
        private authGuard: AuthGuard
    ) {
        this.isLoggedInSubject.next(this.authGuard.isUserLoggedIn());
        this.currentUserSubject.next(this.authGuard.getUser());
    }

    public setUserAccountID = (accountID: string) => {
        this.userAccountID = accountID;
    };

    public getUserAccountID = (): string => {
        let accountID: string | null = null;

        if (isPlatformBrowser(this.platformId)) {
            accountID = localStorage.getItem('userToken');
        }

        if (!accountID) {
            if (isPlatformBrowser(this.platformId)) {
                window.alert('Bitte melden Sie sich an, um fortzufahren.');
            }
            // this.router.navigateByUrl(NAVIGATION_ROUTES[0][1]);
            return this.userAccountID;
        }

        return accountID;
    };

    public loginIntoUserAccount = (
        credentials: Credentials
    ): Observable<AuthenticationResponse> => {
        const parameters = new HttpHeaders().set(
            'Authorization',
            'Bearer TOKEN'
        );
        this.setIsLoggedIn(true);

        // setting subjects

        return this.http
            .post<AuthenticationResponse>(
                AUTHENTICATION_ROUTES[0],
                credentials,
                {
                    headers: parameters,
                }
            )
            .pipe(
                shareReplay(1),
                catchError((err: HttpErrorResponse) => {
                    return throwError(() => err);
                })
            );
    };

    public registerNewUser = (
        credentials: Credentials
    ): Observable<AuthenticationResponse> => {
        this.setIsLoggedIn(true);

        return this.http.put<AuthenticationResponse>(
            AUTHENTICATION_ROUTES[1],
            credentials
        );
    };

    getAuthHeader = (): HttpHeaders | null => {
        const authToken: string =
            localStorage.getItem(LOCAL_STORAGE_USER_AUTH_TOKEN) ?? '';

        if (!authToken.trim()) {
            return null;
        }

        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        });
    };

    public getUserName = (): string => {
        let userName: string = '';

        if (isPlatformBrowser(this.platformId)) {
            userName = localStorage.getItem('userName') ?? '';
        }

        if (!userName.trim()) {
            return '';
        }

        return userName;
    };

    public setIsLoggedIn = (newStatus: boolean) => {
        this.isLoggedInSubject.next(newStatus);
    };

    public getIsLoggedIn = (): boolean => {
        return this.authGuard.isUserLoggedIn();
    };

    public logOutUser = () => {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
            this.updateUserLoginStatus(false, null);
        }

        this.router.navigateByUrl(NAVIGATION_LIST[0].moduleRoutes[0].fullPath);
    };

    public updateUserLoginStatus = (
        newLoginStatus: boolean,
        userObject: User | null
    ) => {
        this.isLoggedInSubject.next(newLoginStatus);
        this.currentUserSubject.next(userObject);
    };
}

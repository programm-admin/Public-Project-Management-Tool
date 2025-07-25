import {
    Component,
    Inject,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterMainComponent } from './core/footer-main/footer-main.component';
import { StartMainModule } from './features/start-main/start-main.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { getMessageObject } from './shared/functions/message-functions';
import { AuthGuard } from './guards/auth/auth.guard';
import { ComponentService } from './services/component/component.service';
import { fromEvent, map, Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { WINDOW_WIDTH_LIMIT } from './shared/variables/window-width-limit';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        RouterOutlet,
        HeaderComponent,
        FooterMainComponent,
        StartMainModule,
        ToastModule,
        DrawerModule,
        ButtonModule,
    ],
    providers: [MessageService],
})
export class AppComponent implements OnInit, OnDestroy {
    public title = 'project-management-tool';
    public isSidebarVisible: boolean = false;

    // responsive design
    public windowSubscription!: Subscription;
    public windowWidth!: number;
    public WINDOW_LIMIT: number = WINDOW_WIDTH_LIMIT;

    constructor(
        private messageService: MessageService,
        private authGuard: AuthGuard,
        private componentService: ComponentService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    ngOnInit(): void {
        this.authGuard.noAccessSubject$.subscribe((status: boolean) => {
            if (status) {
                // show no access message
                this.messageService.add(
                    getMessageObject(
                        'error',
                        'Kein Zugriff',
                        'Kein Zugriff, da du eingeloggt bist.'
                    )
                );
            }
        });

        this.authGuard.noAccessDueToNotLoggedInSubject$.subscribe(
            (status: boolean) => {
                if (status) {
                    // show no access message
                    this.messageService.add(
                        getMessageObject(
                            'error',
                            'Kein Zugriff',
                            'Kein Zugriff, da du nicht eingeloggt bist.'
                        )
                    );
                }
            }
        );

        this.componentService.isSidebarOpenSubject$.subscribe(
            (status: boolean) => {
                this.isSidebarVisible = status;
            }
        );

        if (isPlatformBrowser(this.platformId)) {
            this.windowSubscription = fromEvent(window, 'resize')
                .pipe(map(() => window.innerWidth))
                .subscribe((width: number) => (this.windowWidth = width));
        }
    }

    ngOnDestroy(): void {
        if (this.windowSubscription) this.windowSubscription.unsubscribe();
    }
}

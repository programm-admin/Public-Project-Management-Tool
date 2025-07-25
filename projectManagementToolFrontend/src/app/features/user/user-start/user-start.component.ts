import {
    Component,
    Inject,
    inject,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountService } from '../../../services/user/user-account.service';
import { ProjectWithoutTasks } from '../../../shared/interfaces/ProjectWithoutTasks';
import {
    getNavigationListRoutesOnly,
    navigationRoute,
} from '../../../shared/variables/navigationRoutes';
import { ClickableListComponent } from '../../../core/clickable-list/clickable-list.component';
import { OverviewChartComponent } from '../../../core/overview-chart/overview-chart.component';
import { fromEvent, map, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
    loadAllProjects,
    loadProject,
} from '../../../state/project/project.actions';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    StylesConfiguration,
    StylingService,
} from '../../../services/styling/styling.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TOOLTIP_POSITION } from '../../../shared/variables/styling-variables';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { selectAllProjects } from '../../../state/project/project.selectors';
import { MessageService } from 'primeng/api';
import { getMessageObject } from '../../../shared/functions/message-functions';
import { TimeFormattingServiceService } from '../../../services/general/time-formatting-service.service';
import { ChartComponentInputListItem } from '../../../shared/interfaces/chart-interfaces';
import { WINDOW_WIDTH_LIMIT } from '../../../shared/variables/window-width-limit';

@Component({
    selector: 'app-user-start',
    standalone: true,
    imports: [
        CommonModule,
        ClickableListComponent,
        OverviewChartComponent,
        ReactiveFormsModule,
        ButtonModule,
        TooltipModule,
    ],
    templateUrl: './user-start.component.html',
    styleUrl: './user-start.component.css',
})
export class UserStartComponent implements OnInit, OnDestroy {
    // API call for user
    userProjectLastModifiedTimes: string[] = [];
    userAccountID: string = '';

    stylingConfig: StylesConfiguration | undefined;
    tooltipPosition = TOOLTIP_POSITION.BELOW;

    userAccountService: UserAccountService = inject(UserAccountService);
    navigationRoutesList: navigationRoute[] = getNavigationListRoutesOnly();
    projectDurationList: number[] = [];
    projectTitleList: string[] = [];

    projects$: Observable<ProjectWithoutTasks[]> | undefined;
    projectTitles$: Observable<string[]> | undefined;
    projects: ProjectWithoutTasks[] | undefined = undefined;
    recentProjects: ProjectWithoutTasks[] | undefined = undefined;
    public projectListForChartComponent: ChartComponentInputListItem[] | null =
        null;

    // window width
    private windowSubscription!: Subscription;
    public windowWidth!: number;
    public WINDOW_LIMIT: number = WINDOW_WIDTH_LIMIT;

    constructor(
        private router: Router,
        private store: Store,
        private stylingService: StylingService,
        private messageService: MessageService,
        private timeFormattingService: TimeFormattingServiceService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    ngOnInit(): void {
        this.userAccountID = this.userAccountService.getUserAccountID();
        this.stylingConfig = this.stylingService.getStylesConfiguration();

        this.store.dispatch(loadAllProjects({ accountID: this.userAccountID }));

        this.projects$ = this.store.select(selectAllProjects);
        this.projects$.subscribe({
            next: (projects: ProjectWithoutTasks[]) => {
                this.projects = projects;
                this.recentProjects = projects.filter(
                    (project: ProjectWithoutTasks) => {
                        return (
                            this.timeFormattingService.calculateDateDifference(
                                new Date(),
                                new Date(project.PROJECT_start)
                            ) < 4
                        );
                    }
                );

                this.projectListForChartComponent = this.recentProjects.map(
                    (project: ProjectWithoutTasks) => ({
                        itemTitle: project.PROJECT_title,
                        itemDuration: project.PROJECT_duration,
                    })
                );
            },
            error: () => {
                this.messageService.add(
                    getMessageObject(
                        'error',
                        'Fehler beim Laden der Projekte',
                        'Bitte stelle sicher, dass du eingeloggt bist und probiere es erneut.'
                    )
                );
            },
        });

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

    handleProjectClick = (selectedProjectID: string) => {
        this.store.dispatch(loadProject({ projectID: selectedProjectID }));
        this.router.navigateByUrl(`/project/${selectedProjectID}`);
    };

    navigateToNewProjectPage = () => {
        this.router.navigateByUrl(this.navigationRoutesList[6].fullPath);
    };
}

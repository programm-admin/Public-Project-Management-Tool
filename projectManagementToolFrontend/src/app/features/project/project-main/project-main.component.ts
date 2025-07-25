import {
    Component,
    computed,
    Inject,
    inject,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
    Signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectDetailsServiceService } from '../../../services/project/project-details-service.service';
import { Project } from '../../../shared/interfaces/Project';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TimeFormattingServiceService } from '../../../services/general/time-formatting-service.service';
import { Router } from '@angular/router';
import { UserAccountService } from '../../../services/user/user-account.service';
import { Task } from '../../../shared/interfaces/Task';
import {
    NAVIGATION_LIST,
    NAVIGATION_ROUTES,
} from '../../../shared/variables/navigationRoutes';
import {
    FormBuilder,
    Validators,
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
} from '@angular/forms';
import { fromEvent, map, Observable, Subscription } from 'rxjs';
import {
    ListItem,
    ListItemComponent,
} from '../../../shared/components/list-item/list-item.component';
import { ProjectFormattingService } from '../../../services/project-formatting/project-formatting.service';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { ClickableListComponent } from '../../../core/clickable-list/clickable-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';
import {
    loadProject,
    saveProject,
} from '../../../state/project/project.actions';
import { selectSelectedProject } from '../../../state/project/project.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { MessageService } from 'primeng/api';
import { getMessageObject } from '../../../shared/functions/message-functions';
import { ChartComponentInputListItem } from '../../../shared/interfaces/chart-interfaces';
import { ProjectChartComponent } from '../project-chart/project-chart.component';
import { WINDOW_WIDTH_LIMIT } from '../../../shared/variables/window-width-limit';

@Component({
    selector: 'app-project-main',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ListItemComponent,
        FileUploadComponent,
        ClickableListComponent,
        InputTextModule,
        ButtonModule,
        FloatLabelModule,
        DatePickerModule,
        TooltipModule,
        MessageModule,
        ProjectChartComponent,
    ],
    templateUrl: './project-main.component.html',
    styleUrl: './project-main.component.css',
})
export class ProjectMainComponent implements OnInit, OnDestroy {
    private route: ActivatedRoute = inject(ActivatedRoute);
    public projectStringsForList: Signal<ListItem[]> | null = null;

    public showEditForm: boolean = false;
    public userProject: Project | undefined;
    public taskList: Task[] | undefined;
    public currentProject$!: Observable<Project | undefined>;
    public hasProjectTasks = computed(
        () =>
            this.currentProject &&
            this.currentProject.PROJECT_tasks &&
            this.currentProject.PROJECT_tasks.length > 0
    );
    public currentProject: Project | undefined = undefined;
    public userAccountID: string = '';
    public projectID: string = '';

    // variables for project input

    public projectDuration: number = 1;
    public projectLastModified: Date = new Date();
    public projectOwner: string = '';
    public taskTitleList: string[] = []; // list containing titles of all tasks of current project
    public taskDurationList: number[] = []; // list containing task durations of all tasks of current project

    // form variables
    public projectForm!: FormGroup;

    public isFormSubmitted: boolean = false;
    public isChartAreaVisible: boolean = false;

    // window events
    private windowSubscription!: Subscription;
    public windowWidth!: number;
    public WINDOW_LIMIT: number = WINDOW_WIDTH_LIMIT;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private projectDetailsService: ProjectDetailsServiceService,
        private timeFormattingService: TimeFormattingServiceService,
        private userAccountService: UserAccountService,
        private store: Store<AppState>,
        private projectFormattingService: ProjectFormattingService,
        private messageService: MessageService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.userAccountID = this.userAccountService.getUserAccountID();
    }

    ngOnInit(): void {
        this.projectID = String(this.route.snapshot.params['id']);
        this.store.dispatch(loadProject({ projectID: this.projectID }));

        this.currentProject$ = this.store.select(selectSelectedProject);

        this.currentProject$.subscribe({
            next: (project: Project | undefined) => {
                this.projectForm = this.formBuilder.group({
                    projectTitle: [
                        project?.PROJECT_title ?? '',
                        Validators.required,
                    ],
                    projectDescription: [
                        project?.PROJECT_description ?? '',
                        Validators.required,
                    ],
                    projectStart: [
                        project?.PROJECT_start ?? new Date(),
                        Validators.required,
                    ],
                    projectEnd: [
                        project?.PROJECT_end ?? new Date(),
                        Validators.required,
                    ],
                    projectCustomer: [project?.PROJECT_customer ?? ''],
                    projectTicketNumber: [project?.PROJECT_ticketNumber ?? ''],
                });

                this.currentProject = project;

                if (project) {
                    // setting the list with project properties
                    this.projectStringsForList = computed(() => {
                        const newList: string[][] = Object.entries(
                            this.projectFormattingService.mapToDisplayingProject(
                                project
                            )
                        );

                        return newList.map((stringList: string[]) => {
                            if (
                                stringList[0].trim() === 'Startdatum' ||
                                stringList[0].trim() === 'Enddatum' ||
                                stringList[0].trim() === 'zuletzt geändert'
                            ) {
                                return {
                                    attribute: stringList[0],
                                    value: this.timeFormattingService.formatDateToGermanDate(
                                        new Date(stringList[1])
                                    ),
                                };
                            } else {
                                return {
                                    attribute: stringList[0],
                                    value: stringList[1],
                                };
                            }
                        });
                    });
                }
            },
            error: () => {
                this.messageService.add(
                    getMessageObject(
                        'error',
                        'Fehler beim Laden des Projektes',
                        'Beim Laden des Projektes ist ein Fehler aufgetreten. Bitte lade die Seite erneut.'
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

    public onChangeDatePicker = () => {
        const startDate: Date = new Date(
            this.projectForm.get('projectStart')?.value
        );

        const endDate: Date = new Date(
            this.projectForm.get('projectEnd')?.value
        );

        this.projectDuration =
            this.timeFormattingService.calculateDateDifference(
                startDate,
                endDate
            );
    };

    selectProjectTask = (taskID: string) => {
        console.log('halo');

        if (this.currentProject) {
            let userTask: Task | undefined =
                this.currentProject.PROJECT_tasks.find(
                    (task) => task.TASK_id === taskID
                );

            if (!userTask) {
                return;
            }

            this.projectDetailsService.setCurrentTask(userTask);
            this.router.navigateByUrl(
                `/project/${this.currentProject.PROJECT_id}/task/${taskID}`
            );
        }
    };

    submitProject = () => {
        if (!this.projectForm.valid) {
            this.isFormSubmitted = true;
            alert('Formular falsch ausgefüllt');
            return;
        }

        this.saveCurrentProject();

        this.isFormSubmitted = false;
    };

    saveCurrentProject = () => {
        const editedProject: Project = {
            ...this.projectForm.value,
            PROJECT_tasks: this.userProject?.PROJECT_tasks,
            PROJECT_lastModified: new Date(),
            PROJECT_id: this.projectID,
            PROJECT_duration: this.projectDuration,
        };

        this.store.dispatch(saveProject({ project: editedProject }));
        this.router.navigateByUrl(NAVIGATION_ROUTES[5][1]);
    };

    navigateToNewTaskPage = () => {
        this.router.navigateByUrl(`/project/${this.projectID}/new/task`);
    };

    switchPage = (newBoolean: boolean) => {
        this.showEditForm = newBoolean;

        if (newBoolean) {
            console.log('true:', this.projectForm.get('projectEnd')?.value);
        }

        if (newBoolean && this.currentProject) {
            this.projectForm = this.formBuilder.group({
                projectTitle: [
                    new FormControl(this.currentProject.PROJECT_title).value,
                    Validators.required,
                ],
                projectDescription: [
                    new FormControl(
                        this.currentProject.PROJECT_description ?? ''
                    ).value,
                    Validators.required,
                ],
                projectStart: [
                    new FormControl(
                        new Date(this.currentProject.PROJECT_start) ??
                            new Date()
                    ).value,
                    Validators.required,
                ],
                projectEnd: [
                    new FormControl(
                        new Date(this.currentProject.PROJECT_end) ?? new Date()
                    ).value,
                    Validators.required,
                ],
                projectCustomer: [
                    new FormControl(this.currentProject.PROJECT_customer ?? '')
                        .value,
                    Validators.required,
                ],
                projectTicketNumber: [
                    new FormControl(
                        this.currentProject.PROJECT_ticketNumber ?? ''
                    ).value,
                    Validators.required,
                ],
            });
        }
        this.onChangeDatePicker();
    };

    goBackToUserStart = () => {
        this.router.navigateByUrl(NAVIGATION_LIST[2].moduleRoutes[0].fullPath);
    };

    public hasError = (field: string): boolean => {
        const formControl = this.projectForm.get(field);

        return (
            formControl! &&
            (formControl.dirty || formControl.touched || this.isFormSubmitted)
        );
    };

    public switchchartVisibility = (newVisibilityStatus: boolean) => {
        this.isChartAreaVisible = newVisibilityStatus;
    };

    public formatDataForChart = ():
        | ChartComponentInputListItem[]
        | undefined => {
        return this.currentProject?.PROJECT_tasks.map((task: Task) => ({
            itemTitle: task.TASK_title,
            itemDuration: task.TASK_duration,
        }));
    };
}

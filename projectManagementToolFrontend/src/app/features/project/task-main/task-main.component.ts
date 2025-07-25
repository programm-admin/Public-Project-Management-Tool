import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../shared/interfaces/Task';
import { ProjectDetailsServiceService } from '../../../services/project/project-details-service.service';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { TimeFormattingServiceService } from '../../../services/general/time-formatting-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../../../shared/interfaces/Project';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import {
    ListItem,
    ListItemComponent,
} from '../../../shared/components/list-item/list-item.component';
import { ProjectFormattingService } from '../../../services/project-formatting/project-formatting.service';
import { NavigationService } from '../../../services/navigation/navigation.service';
import { MessageModule } from 'primeng/message';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { loadProject } from '../../../state/project/project.actions';
import { selectCurrenTask } from '../../../state/task/task.selectors';
import { loadTask, saveTask } from '../../../state/task/task.actions';
import { MessageService } from 'primeng/api';
import { getMessageObject } from '../../../shared/functions/message-functions';

@Component({
    selector: 'app-task-main',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ButtonModule,
        DatePickerModule,
        FloatLabelModule,
        TooltipModule,
        InputTextModule,
        ListItemComponent,
        MessageModule,
    ],
    templateUrl: './task-main.component.html',
    styleUrl: './task-main.component.css',
})
export class TaskMainComponent implements OnInit {
    route: ActivatedRoute = inject(ActivatedRoute);
    showTaskForm: boolean = false;
    currentTaskContentList: Signal<ListItem[]> | undefined = undefined;

    selectedTask: Task | undefined;
    selectedTask$: Observable<Task> | undefined = undefined;
    projectDetailsService: ProjectDetailsServiceService = inject(
        ProjectDetailsServiceService
    );
    projectID: string = '';
    taskID: string = '';
    taskForm!: FormGroup;
    project$!: Observable<Project | undefined>;
    task!: Task | undefined;
    timeFormattingService: TimeFormattingServiceService = inject(
        TimeFormattingServiceService
    );

    // variables of task
    taskTitle: string = '';
    taskDescription: string = '';
    taskStart: Date = new Date();
    taskEnd: Date = new Date();
    taskDuration: number = 1; // because task is at least 1 day long
    taskMembers: string[] = [];
    taskTicketNumber: string = '';

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private projectFormattingService: ProjectFormattingService,
        private navigationService: NavigationService,
        private store: Store<AppState>,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.taskID = String(this.route.snapshot.params['taskId']);
        this.projectID = String(this.route.snapshot.params['id']);

        this.store.dispatch(loadProject({ projectID: this.projectID }));
        this.store.dispatch(
            loadTask({ taskID: this.taskID, projectId: this.projectID })
        );

        this.selectedTask$ = this.store.select(selectCurrenTask);

        this.selectedTask$.subscribe({
            next: (task) => {
                this.selectedTask = task;

                this.taskForm = this.formBuilder.group({
                    TASK_title: [task.TASK_title, Validators.required],
                    TASK_description: [
                        task.TASK_description,
                        Validators.required,
                    ],
                    TASK_start: [
                        task.TASK_start ?? new Date(),
                        Validators.required,
                    ],
                    TASK_end: [
                        new Date(task.TASK_end ?? new Date()),
                        Validators.required,
                    ],
                    TASK_members: [task.TASK_Members.join(' ')],
                    TASK_ticketNumber: [task.TASK_ticketNumber],
                });

                this.currentTaskContentList = computed(() => {
                    const newList: string[][] = Object.entries(
                        this.projectFormattingService.mapToDisplayingTask(task)
                    );

                    return newList.map((taskAttributList: string[]) => {
                        if (
                            taskAttributList[0].trim() === 'Startdatum' ||
                            taskAttributList[0].trim() === 'Enddatum' ||
                            taskAttributList[0].trim() === 'zuletzt geändert'
                        ) {
                            return {
                                attribute: taskAttributList[0],
                                value: this.timeFormattingService.formatDateToGermanDate(
                                    new Date(taskAttributList[1])
                                ),
                            };
                        } else {
                            return {
                                attribute: taskAttributList[0],
                                value: taskAttributList[1],
                            };
                        }
                    });
                });
            },
            error: () => {
                this.messageService.add(
                    getMessageObject(
                        'error',
                        'Fehler beim Laden der Aufgabe',
                        'Beim Laden der Aufgabe ist ein Fehler aufgetreten. Bitte probiere es erneut.'
                    )
                );
            },
        });
    }

    submitTask = () => {
        const newTask: Task = {
            ...this.taskForm.value,
            TASK_id: this.taskID,
            TASK_lastModified: new Date(),
            TASK_duration: this.taskDuration,
            TASK_Members: this.taskForm.get('TASK_members')?.value.split(','),
        };
        this.store.dispatch(
            saveTask({ task: newTask, projectId: this.projectID })
        );

        this.switchTaskForm(false);
    };

    cancelTaskEditing = () => {
        this.router.navigateByUrl(`/project/${this.projectID}`);
    };

    switchTaskForm = (newBoolean: boolean) => {
        this.showTaskForm = newBoolean;

        if (newBoolean && this.selectedTask) {
            this.taskForm = this.formBuilder.group({
                TASK_title: [this.selectedTask.TASK_title, Validators.required],
                TASK_description: [
                    this.selectedTask.TASK_description,
                    Validators.required,
                ],
                TASK_start: [
                    new Date(this.selectedTask.TASK_start),
                    Validators.required,
                ],
                TASK_end: [
                    new Date(this.selectedTask.TASK_end),
                    Validators.required,
                ],
                TASK_members: [this.selectedTask.TASK_Members.join(' ')],
                TASK_ticketNumber: [this.selectedTask.TASK_ticketNumber],
            });
        }

        this.calculateTaskDuration();
    };

    public navigateBackToProjectsPage = () => {
        this.navigationService.navigateToCurrentProjectPage(this.projectID);
    };

    public hasError = (formField: string): boolean => {
        const fieldControl = this.taskForm.get(formField);

        return (
            fieldControl!.invalid &&
            (fieldControl!.dirty || fieldControl!.touched)
        );
    };

    public calculateTaskDuration = () => {
        const startDate: Date = new Date(
            this.taskForm.get('TASK_start')?.value
        );
        const endDate: Date = new Date(this.taskForm.get('TASK_end')?.value);

        this.taskDuration = this.timeFormattingService.calculateDateDifference(
            startDate,
            endDate
        );
    };
}

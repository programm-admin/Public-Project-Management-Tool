import { Component, inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectDetailsServiceService } from '../../../services/project/project-details-service.service';
import { TimeFormattingServiceService } from '../../../services/general/time-formatting-service.service';
import { Router } from '@angular/router';
import generateUniqueId from 'generate-unique-id';
import { ID_RULES_OBJECT } from '../../../shared/variables/IDRules';
import { Task } from '../../../shared/interfaces/Task';
import { Project } from '../../../shared/interfaces/Project';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../services/navigation/navigation.service';
import { ToastModule } from 'primeng/toast';
import { AppState } from '../../../state/app.state';
import { createNewTask } from '../../../state/task/task.actions';

@Component({
    selector: 'app-new-task',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        TooltipModule,
        FloatLabelModule,
        DatePickerModule,
        MessageModule,
        CommonModule,
        ToastModule,
    ],
    templateUrl: './new-task.component.html',
    styleUrl: './new-task.component.css',
})
export class NewTaskComponent implements OnInit {
    projectID: string = ''; // is assigned in constructor
    taskID: string = ''; // is generated in constructor
    timeFormattingService: TimeFormattingServiceService = inject(
        TimeFormattingServiceService
    );

    currentProject: Project | undefined;

    newTaskForm!: FormGroup;
    public isFormSubmitted: boolean = false;
    public taskDuration: number = 1;

    // functions -----------------------------------------------------------------------
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private navigationService: NavigationService,
        private store: Store<AppState>,
        private projectDetailsService: ProjectDetailsServiceService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.projectID = String(this.route.snapshot.params['id']);

        this.newTaskForm = this.formBuilder.group({
            TASK_title: [new FormControl('').value, Validators.required],
            TASK_description: [new FormControl('').value, Validators.required],
            TASK_start: [
                new FormControl(new Date()).value,
                Validators.required,
            ],
            TASK_end: [new FormControl(new Date()).value, Validators.required],
            TASK_Members: [new FormControl(['']).value?.join(' ')],
            TASK_ticketNumber: [new FormControl('').value],
        });

        const newGeneratedTaskID: string = generateUniqueId(ID_RULES_OBJECT);
        this.taskID = `${
            this.projectDetailsService.getCurrentProject().PROJECT_id
        }-${newGeneratedTaskID}`;
    }

    submitNewTask = (): void => {
        this.isFormSubmitted = true;

        if (!this.newTaskForm.valid) {
            return;
        }

        const newTask: Task = {
            ...this.newTaskForm.value,
            TASK_id: this.taskID,
            TASK_lastModified: new Date(),
        };

        this.store.dispatch(
            createNewTask({
                task: newTask,
                projectId: this.projectID,
            })
        );

        this.router.navigateByUrl(`/project/${this.projectID}`);
    };

    public hasError = (field: string): boolean => {
        const fieldControl = this.newTaskForm.get(field);

        return (
            fieldControl!.invalid &&
            (fieldControl!.dirty || fieldControl!.touched)
        );
    };

    public navigateToProjectMainPage = () => {
        this.navigationService.navigateToCurrentProjectPage(this.projectID);
    };

    public calculateTaskDuration = () => {
        const startDate: Date = new Date(
            this.newTaskForm.get('TASK_start')?.value
        );

        const endDate: Date = new Date(this.newTaskForm.get('TASK_end')?.value);

        this.taskDuration = this.timeFormattingService.calculateDateDifference(
            startDate,
            endDate
        );
    };
}

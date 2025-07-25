import { Component, OnInit } from '@angular/core';
import { ProjectDetailsServiceService } from '../../../services/project/project-details-service.service';
import { UserAccountService } from '../../../services/user/user-account.service';
import generateUniqueId from 'generate-unique-id';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from '../../../shared/interfaces/Project';
import { TimeFormattingServiceService } from '../../../services/general/time-formatting-service.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { saveNewProject } from '../../../state/project/project.actions';
import { NAVIGATION_LIST } from '../../../shared/variables/navigationRoutes';

@Component({
    selector: 'app-new-project',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        FloatLabelModule,
        DatePickerModule,
    ],
    templateUrl: './new-project.component.html',
    styleUrl: './new-project.component.css',
})
export class NewProjectComponent implements OnInit {
    newProjectForm!: FormGroup;

    PROJECT_id: string = '';
    userProject: Project | null;

    isDialogOpen: boolean = false;
    // dialog = inject(MatDialog);

    public minDate: Date = new Date();

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private userAccountService: UserAccountService,
        private projectDetailsService: ProjectDetailsServiceService,
        private timeFormattingService: TimeFormattingServiceService,
        private store: Store<AppState>
    ) {
        this.userProject = this.projectDetailsService.getCurrentProject();
    }

    ngOnInit(): void {
        this.newProjectForm = this.formBuilder.group({
            PROJECT_title: ['', Validators.required],
            PROJECT_description: ['', Validators.required],
            PROJECT_start: [new Date(), Validators.required],
            PROJECT_end: [new Date(), Validators.required],
            PROJECT_customer: [''],
            PROJECT_ticketNumber: [''],
        });
        this.PROJECT_id = generateUniqueId({
            length: 30,
            includeSymbols: ['_', '!', '§'],
        });
    }

    handleFormSubmit = () => {
        if (!this.newProjectForm.valid) {
            return;
        }

        // in days
        const newProjectDuration: number =
            this.timeFormattingService.calculateTimeDifference(
                new Date(this.newProjectForm.get('PROJECT_start')?.value ?? ''),
                new Date(this.newProjectForm.get('PROJECT_end')?.value ?? '')
            );

        const newProject: Project = {
            ...this.newProjectForm.value,
            PROJECT_title: this.newProjectForm.get('PROJECT_title')?.value,
            PROJECT_description:
                this.newProjectForm.get('PROJECT_description')?.value ?? '',
            PROJECT_id: this.PROJECT_id,
            PROJECT_start: this.newProjectForm.get('PROJECT_start')?.value,
            PROJECT_end: this.newProjectForm.get('PROJECT_end')?.value,
            PROJECT_duration: newProjectDuration,
            PROJECT_lastModified: new Date(),
            PROJECT_customer:
                this.newProjectForm.get('PROJECT_customer')?.value ?? '',
            PROJECT_ticketNumber:
                this.newProjectForm.get('PROJECT_ticketNumber')?.value ?? '',
            PROJECT_tasks: [],
            PROJECT_owner: this.userAccountService.getUserAccountID(),
        };

        // this.projectStore.saveNewProject(newProject);

        this.store.dispatch(saveNewProject({ project: newProject }));
        this.router.navigateByUrl(`/project/${this.PROJECT_id}`);
    };

    public navigateToProjectMainPage = () => {
        this.router.navigateByUrl(NAVIGATION_LIST[2].moduleRoutes[0].fullPath);
    };
}

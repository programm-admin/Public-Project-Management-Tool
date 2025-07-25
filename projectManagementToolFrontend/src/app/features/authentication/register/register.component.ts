import { Component, inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { UserAccountService } from '../../../services/user/user-account.service';
import { Router } from '@angular/router';
import { NAVIGATION_ROUTES } from '../../../shared/variables/navigationRoutes';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { AuthenticationResponse } from '../../../shared/interfaces/AuthenticationResponse';
import { MessageService } from 'primeng/api';
import { getMessageObject } from '../../../shared/functions/message-functions';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        Message,
        InputTextModule,
        FloatLabelModule,
        PasswordModule,
        CommonModule,
        DialogModule,
    ],
})
export class RegisterComponent implements OnInit {
    public userAccountID: string = '';
    private userName: string = '';

    // variables for form input
    public userForm!: FormGroup;
    public isUserNameInvalid: boolean = false;
    public isPasswordInvalid: boolean = false;
    public isConfirmationPasswordInvalid: boolean = false;
    public isDialogVisible: boolean = false;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private userAccountService: UserAccountService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.userForm = this.formBuilder.group({
            userName: [new FormControl('').value, Validators.required],
            password: [
                new FormControl('').value,
                [Validators.required, Validators.minLength(8)],
            ],
            confirmationPassword: [
                new FormControl('').value,
                [Validators.required, Validators.minLength(8)],
            ],
        });
    }

    // functions ------------------------------------
    submitUserForm = () => {
        if (!this.userForm.valid) {
            this.showErrorDialog();
        }

        this.userAccountID =
            '8eufx7lh@$gxpzcy1m_r81?r5tz!d2hyd0e0d55bycfhw?z4o4wyfkzs8l6vj6';

        this.userName = this.userForm.get('userName')?.value;

        this.userAccountService
            .registerNewUser({
                userName: this.userForm.get('userName')?.value,
                password: this.userForm.get('password')?.value,
            })
            .subscribe({
                next: (registedUserResponse: AuthenticationResponse) => {
                    const responseUser = registedUserResponse;

                    localStorage.setItem('authToken', responseUser.authToken);
                    localStorage.setItem('userToken', responseUser.accountID);
                    localStorage.setItem('userName', this.userName);

                    this.messageService.add(
                        getMessageObject('success', 'erfolgreich registriert')
                    );
                },
                error: () => {
                    this.messageService.add(
                        getMessageObject(
                            'error',
                            'Fehler beim Registrieren',
                            'Beim Registrieren ist ein Fehler aufgetreten. Bitte prüfe deine Daten und probiere es erneut.'
                        )
                    );
                },
            });

        // this.userAccountService.setUserAccountID(this.userAccountID);
        this.router.navigateByUrl(`${NAVIGATION_ROUTES[5][1]}`);
    };

    public isFieldValid = (field: string): boolean => {
        const fieldControl = this.userForm.get(field);

        return (
            fieldControl!.invalid &&
            (fieldControl!.dirty || fieldControl!.touched)
        );
    };

    public showErrorDialog = () => {
        this.isDialogVisible = true;
    };
}

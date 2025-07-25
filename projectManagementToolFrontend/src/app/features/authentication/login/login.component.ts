import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '../../../shared/interfaces/CredentialsInterface';
import { UserAccountService } from '../../../services/user/user-account.service';
import {
    NAVIGATION_LIST,
    NAVIGATION_ROUTES,
} from '../../../shared/variables/navigationRoutes';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { DialogModule } from 'primeng/dialog';
import { Message } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { AuthenticationResponse } from '../../../shared/interfaces/AuthenticationResponse';
import { MessageService } from 'primeng/api';
import { getMessageObject } from '../../../shared/functions/message-functions';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        FloatLabel,
        PasswordModule,
        DialogModule,
        Message,
        CommonModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    public isDialogVisible: boolean = false;
    public isUserNameInvalid: boolean = false;
    public isPasswordInvalid: boolean = false;
    private userName: string = '';

    constructor(
        private router: Router,
        private userAccountService: UserAccountService,
        private formBuilder: FormBuilder,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: [new FormControl('').value, Validators.required],
            password: [
                new FormControl('').value,
                [Validators.required, Validators.minLength(8)],
            ],
        });
    }

    submitLoginForm = () => {
        if (!this.loginForm.valid) {
            if (!this.loginForm.get('userName')?.valid) {
                this.isUserNameInvalid = true;
            }

            this.showDialog();
            return;
        }

        this.userName = this.loginForm.get('userName')?.value;

        const credentials: Credentials = this.loginForm.value;

        this.userAccountService.loginIntoUserAccount(credentials).subscribe({
            next: (response: AuthenticationResponse) => {
                const responseObject: AuthenticationResponse = response;

                localStorage.setItem('authToken', responseObject.authToken);
                localStorage.setItem('userToken', responseObject.accountID);
                localStorage.setItem('userName', this.userName);
                this.router.navigateByUrl(
                    NAVIGATION_LIST[2].moduleRoutes[0].fullPath
                );

                this.messageService.add(
                    getMessageObject('success', 'erfolgreich eingeloggt')
                );
            },
            error: () => {
                this.messageService.add(
                    getMessageObject(
                        'error',
                        'Fehler beim Login',
                        'Beim Login ist ein Fehler aufgetreten. Bitte prüfe deine Daten und probiere es erneut.'
                    )
                );
            },
        });
    };

    showDialog = () => [(this.isDialogVisible = true)];

    isFieldValid = (field: string): boolean => {
        const fieldControl = this.loginForm.get(field);

        this.isUserNameInvalid = false;
        this.isPasswordInvalid = false;

        return (
            fieldControl!.invalid &&
            (fieldControl!.dirty || fieldControl!.touched)
        );
    };
}

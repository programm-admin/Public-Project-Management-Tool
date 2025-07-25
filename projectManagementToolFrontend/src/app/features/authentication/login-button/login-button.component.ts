import { NgIf } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [NgIf],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css',
})
export class LoginButtonComponent {
  // checks whether button is for login on login page or for login on register page -> for button text
  @Input() isLoginButton: boolean = false;
  public buttonTextList: string[] = ['Login', 'Registrieren'];
  // navigationLinkToUser: string = NAVIGATION_ROUTES[5][1];
  public navigationLinkToUser: string = '';

  constructor(private router: Router) {}

  navigateToUserURL = () => {
    // navigating user to user start page
    this.router.navigateByUrl(`${this.navigationLinkToUser}`);
  };
}

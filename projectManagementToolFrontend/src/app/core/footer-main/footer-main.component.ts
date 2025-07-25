import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    getNavigationListRoutesOnly,
    navigationRoute,
} from '../../shared/variables/navigationRoutes';

@Component({
    selector: 'app-footer-main',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './footer-main.component.html',
    styleUrl: './footer-main.component.css',
})
export class FooterMainComponent {
    public generalSiteList: navigationRoute[] = getNavigationListRoutesOnly();
}

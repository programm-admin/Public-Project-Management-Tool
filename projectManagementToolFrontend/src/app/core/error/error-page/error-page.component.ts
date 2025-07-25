import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [ NgIf ],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {
    @Input() errorCode: string = "";
    @Input() errorMessage: string = "";


}

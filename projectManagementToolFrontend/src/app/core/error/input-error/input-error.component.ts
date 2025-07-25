import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-error',
  standalone: true,
  imports: [ NgIf ],
  templateUrl: './input-error.component.html',
  styleUrl: './input-error.component.css'
})
export class InputErrorComponent {
    @Input() errorText: string = "";

}

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ErrorDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-error-dialog',
  imports: [FormsModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss',
})
export class ErrorDialogComponent {
  // readonly dialogRef = inject(MatDialogRef);
  // readonly errorData = inject<ErrorDialogData>(MAT_DIALOG_DATA);
  // onNoClick = () => {
  //   this.dialogRef.close();
  // };
}

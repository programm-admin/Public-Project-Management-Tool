import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

import { KatanaWebsiteDialogData } from '../../../shared/interfaces/KatanaWebsiteDialog';

@Component({
  selector: 'app-katana-dialog',
  imports: [],
  templateUrl: './katana-dialog.component.html',
  styleUrl: './katana-dialog.component.scss',
})
export class KatanaDialogComponent {
  // readonly dialogRef = inject(MatDialogRef<KatanaDialogComponent>);
  // readonly data = inject<KatanaWebsiteDialogData>(MAT_DIALOG_DATA);
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
}

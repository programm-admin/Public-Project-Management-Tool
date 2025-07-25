import { Component, input, OnInit } from '@angular/core';
import { FileService } from '../../../services/files/file.service';
import { CommonModule } from '@angular/common';
import { FileForProject } from '../../interfaces/FileForProject';
import {
    StylesConfiguration,
    StylingService,
} from '../../../services/styling/styling.service';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { getMessageObject } from '../../functions/message-functions';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'app-file-upload',
    imports: [CommonModule, FileUploadModule, ButtonModule],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent implements OnInit {
    selectedFiles: File[] = [];
    fileNames: string[] = [];
    selectableFiles: FileForProject[] = [
        {
            fileName: 'ddd',
            originalName: 'ddd',
            accountID: 'dd',
            projectID: 'ss',
        },
    ];

    public uploadedFiles: File[] = [];

    accountID = input.required<string>();
    projectID = input.required<string>();
    stylesConfig: StylesConfiguration | undefined;
    displayedColumns = ['originalName', 'fileName', 'fileDelete'];

    uploadInProgress: boolean = false;

    constructor(
        private fileService: FileService,
        private stylingService: StylingService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.fileService
            .getFileNamesForProject(this.projectID(), this.accountID())
            .subscribe({
                next: (fileForProject: FileForProject[]) => {
                    this.selectableFiles = fileForProject;
                },
                error: () => {
                    this.messageService.add(
                        getMessageObject(
                            'error',
                            'Fehler beim Laden der Dateien',
                            'Bitte probiere es erneut.'
                        )
                    );
                },
            });

        this.stylesConfig = this.stylingService.getStylesConfiguration();
    }

    downloadFile = (fileName: string, originalFileNam: string) => {
        const downloadAnchorTag = document.createElement('a');

        downloadAnchorTag.href = `http://localhost:8000/files/${encodeURIComponent(
            fileName
        )}`;

        this.fileService.downloadFile(fileName).subscribe((blob: Blob) => {
            const aTag = document.createElement('a');
            const url = URL.createObjectURL(blob);

            aTag.href = url;
            aTag.download = originalFileNam;

            document.body.appendChild(aTag);
            aTag.click();
            document.body.removeChild(aTag);

            URL.revokeObjectURL(url);
        });

        // downloadAnchorTag.download = fileName;
        // document.body.appendChild(downloadAnchorTag);
        // downloadAnchorTag.click();
        // document.body.removeChild(downloadAnchorTag);
    };

    onFileSelect(event: any): void {
        const newFiles: File[] = Array.from(event.target.files);

        this.selectedFiles = event.target.files;

        this.fileNames.push(...newFiles.map((file) => file.name));
    }

    onUploadFiles = (event: Event) => {
        event.preventDefault();

        if (this.selectedFiles.length > 1) {
            this.fileService
                .uploadFiles(
                    this.selectedFiles,
                    this.projectID(),
                    this.accountID()
                )
                .subscribe({
                    next: () =>
                        this.messageService.add(
                            getMessageObject(
                                'success',
                                'Dateien erfolgreich hochgeladen'
                            )
                        ),
                    error: () =>
                        this.messageService.add(
                            getMessageObject(
                                'error',
                                'Fehler beim Hochladen der Dateien',
                                'Bitte probiere es erneut und prüfe deine Dateien.'
                            )
                        ),
                });
        } else {
            // single file
            this.fileService
                .uploadFile(
                    this.selectedFiles,
                    this.projectID(),
                    this.accountID()
                )
                .subscribe({
                    next: () =>
                        this.messageService.add(
                            getMessageObject(
                                'success',
                                'Datei erfolgreich hochgeladen'
                            )
                        ),
                    error: () =>
                        this.messageService.add(
                            getMessageObject(
                                'error',
                                'Fehler beim Hochladen der Datei',
                                'Bitte probiere es erneut und prüfe deine Dateien.'
                            )
                        ),
                });
        }
    };

    upload = (event: FileUploadEvent) => {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        if (this.uploadedFiles.length > 1) {
            this.fileService
                .uploadFiles(
                    this.uploadedFiles,
                    this.projectID(),
                    this.accountID()
                )
                .subscribe({
                    next: () =>
                        this.messageService.add(
                            getMessageObject(
                                'success',
                                'Dateien erfolgreich hochgeladen'
                            )
                        ),
                    error: () =>
                        this.messageService.add(
                            getMessageObject(
                                'error',
                                'Fehler beim Hochladen der Datei',
                                'Bitte probiere es erneut und prüfe deine Dateien.'
                            )
                        ),
                });
        } else if (this.uploadedFiles.length === 1) {
            this.fileService
                .uploadFile(
                    this.uploadedFiles,
                    this.projectID(),
                    this.accountID()
                )
                .subscribe({
                    next: () =>
                        this.messageService.add(
                            getMessageObject(
                                'success',
                                'Datei erfolgreich hochgeladen'
                            )
                        ),
                    error: () =>
                        this.messageService.add(
                            getMessageObject(
                                'error',
                                'Fehler beim Hochladen der Datei',
                                'Bitte probiere es erneut und prüfe deine Datei.'
                            )
                        ),
                });
        }

        this.messageService.add({
            severity: 'success',
            summary: 'Dateien erfolgreich hochgeladen',
        });
    };
}

/**<table mat-table [dataSource]="selectableFiles">
    <!-- original file name column -->
    <ng-container matColumnDef="originalName">
      <th mat-header-cell *matHeaderCellDef>Dateiname</th>
      <td mat-cell *matCellDef="let element">{{ element.originalName }}</td>
    </ng-container>

    <!-- download button column -->
    <ng-container matColumnDef="fileName">
      <th mat-header-cell *matHeaderCellDef>Download</th>
      <td mat-cell *matCellDef="let element">
        <button
          (click)="downloadFile(element.fileName, element.originalName)"
          matTooltip="Hier zum direkten Herunterladen klicken."
          matTooltipPosition="right"
          [matTooltipHideDelay]="stylesConfig?.tooltipDisplayDelay"
        >
          <mat-icon fontIcon="download" />
        </button>
      </td>
    </ng-container>

    <ng-container matColumnDef="fileDelete">
      <th mat-header-cell *matHeaderCellDef>Löschen</th>
      <td mat-cell *matCellDef="let element">
        <button
          (click)="downloadFile(element.fileName, element.originalName)"
          matTooltip="Hier zum Löschen klicken."
          matTooltipPosition="right"
          [matTooltipHideDelay]="stylesConfig?.tooltipDisplayDelay"
        >
          <mat-icon fontIcon="delete" />
        </button>
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
  </table> */

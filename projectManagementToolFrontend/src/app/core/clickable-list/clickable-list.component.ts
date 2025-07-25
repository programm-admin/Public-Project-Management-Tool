import { Component, Input, input, InputSignal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Task } from '../../shared/interfaces/Task';
import { ProjectWithoutTasks } from '../../shared/interfaces/ProjectWithoutTasks';
import { DateFormattingPipePipe } from '../../pipes/DatePipeFormattingPipe/date-formatting-pipe.pipe';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { WINDOW_WIDTH_LIMIT } from '../../shared/variables/window-width-limit';

@Component({
    selector: 'app-clickable-list',
    standalone: true,
    imports: [
        CommonModule,
        DateFormattingPipePipe,
        CardModule,

        DataViewModule,
        TooltipModule,
    ],
    templateUrl: './clickable-list.component.html',
    styleUrl: './clickable-list.component.css',
})
export class ClickableListComponent {
    // for differentiating whether project list or task list should be displayed
    public isProjectListGiven = input.required<boolean>();

    // input properties
    public inpProjectList = input<ProjectWithoutTasks[]>([]);
    public inpTaskList = input<Task[]>([]);

    public STRING_SPLITTING: number = 20;

    @Input()
    inpHandleItemClick!: (selectedProjectID: string) => void;
    public inpWindowWidth: InputSignal<number> = input.required<number>();

    public WINDOW_LIMIT: number = WINDOW_WIDTH_LIMIT;

    // functions ------------------------------------------
    handleProjectItemClick = (selectedProjectItemID: string) => {
        this.inpHandleItemClick(selectedProjectItemID);
    };
}

import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    input,
    InputSignal,
    Output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Panel, PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';

export interface ListItem {
    attribute: string;
    value: string;
}

@Component({
    selector: 'app-list-item',
    imports: [
        PanelModule,
        CommonModule,
        ButtonModule,
        TooltipModule,
        TableModule,
    ],
    templateUrl: './list-item.component.html',
    styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
    public projectMetaInput: InputSignal<ListItem[]> =
        input.required<ListItem[]>();
    public inpIsProject: InputSignal<boolean> = input.required<boolean>();

    @Output() editProject: EventEmitter<boolean> = new EventEmitter<boolean>(
        false
    );

    editProjectMeta = () => {
        this.editProject.emit(true);
    };
}

import { Component, input, InputSignal, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import {
    ChartComponentInputListItem,
    ChartObject,
    ChartObjectOptions,
} from '../../../shared/interfaces/chart-interfaces';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-project-chart',
    imports: [ChartModule, CommonModule],
    templateUrl: './project-chart.component.html',
    styleUrl: './project-chart.component.scss',
})
export class ProjectChartComponent implements OnInit {
    // input variables
    public inpChartData: InputSignal<ChartComponentInputListItem[]> =
        input.required<ChartComponentInputListItem[]>();

    public chartDataProjectTasks: ChartObject | null = null;
    public chartDataProjectTasksOptions: ChartObjectOptions | null = null;

    ngOnInit(): void {
        this.chartDataProjectTasks = {
            labels: this.inpChartData().map(
                (taskItem: ChartComponentInputListItem) => taskItem.itemTitle
            ),
            datasets: [
                {
                    data: this.inpChartData().map(
                        (taskItem: ChartComponentInputListItem) =>
                            taskItem.itemDuration
                    ),
                    backgroundColor: 'rgb(255, 200, 200)',
                    borderColor: 'rgb(255, 200, 200)',
                    label: 'Dauer [in Tagen]',
                },
            ],
        };

        this.chartDataProjectTasksOptions = {
            indexAxis: 'x',
            aspectRatio: 3,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'rgb(255, 200, 200)',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: 'rgb(255, 200, 200)',
                        font: {
                            weight: 0.4,
                        },
                    },
                    grid: {
                        color: 'rgb(255, 255, 255)',
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: 'rgb(255, 200, 200)',
                        font: {
                            weight: 0.4,
                        },
                    },
                    grid: {
                        color: 'rgb(255, 255, 255)',
                        drawBorder: false,
                    },
                },
            },
        };
    }
}

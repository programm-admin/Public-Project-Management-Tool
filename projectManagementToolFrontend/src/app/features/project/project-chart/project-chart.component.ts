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
                    backgroundColor: 'rgba(206, 81, 81, 1)',
                    borderColor: 'rgb(206, 81, 81)',
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
                        color: 'rgba(0, 0, 0, 1)',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: 'rgba(0, 0, 0, 1)',
                        font: {
                            weight: 0.4,
                        },
                    },
                    grid: {
                        color: 'rgb(0, 0, 0)',
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: 'rgba(0, 0, 0, 1)',
                        font: {
                            weight: 0.4,
                        },
                    },
                    grid: {
                        color: 'rgb(0, 0, 0)',
                        drawBorder: false,
                    },
                },
            },
        };
    }
}

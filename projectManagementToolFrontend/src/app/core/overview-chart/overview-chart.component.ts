import { Component, inject, input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ProjectDetailsServiceService } from '../../services/project/project-details-service.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { loadAllProjects } from '../../state/project/project.actions';
import { ProjectWithoutTasks } from '../../shared/interfaces/ProjectWithoutTasks';
import { MessageService } from 'primeng/api';
import { getMessageObject } from '../../shared/functions/message-functions';
import { ChartModule } from 'primeng/chart';
import {
    ChartObject,
    ChartObjectOptions,
} from '../../shared/interfaces/chart-interfaces';
import { Observable } from 'rxjs';
import { selectAllProjects } from '../../state/project/project.selectors';
import { TimeFormattingServiceService } from '../../services/general/time-formatting-service.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-overview-chart',
    standalone: true,
    imports: [ChartModule, CommonModule],
    templateUrl: './overview-chart.component.html',
    styleUrl: './overview-chart.component.css',
})
export class OverviewChartComponent implements OnInit {
    public inputHoverString = input<string>(); // string that is displayed when hovering over a bar
    public inputHeading = input<string>(); // heading of component

    public accountID = input.required<string>();

    public chart: ChartObject | null = null;
    public chartOptions: ChartObjectOptions | null = null;
    public projects$: Observable<ProjectWithoutTasks[]> | undefined = undefined;

    constructor(
        private projectDetailsService: ProjectDetailsServiceService,
        private store: Store<AppState>,
        private messageService: MessageService,
        private timeFormattingService: TimeFormattingServiceService
    ) {}

    createChart = () => {
        this.projects$ = this.store.select(selectAllProjects);

        this.projects$.subscribe({
            next: (projects: ProjectWithoutTasks[]) => {
                const recentProjects: ProjectWithoutTasks[] = projects.filter(
                    (project: ProjectWithoutTasks) => {
                        return (
                            this.timeFormattingService.calculateDateDifference(
                                new Date(),
                                new Date(project.PROJECT_start)
                            ) < 3
                        );
                    }
                );

                const titles: string[] = recentProjects.map(
                    (project) => project.PROJECT_title
                );
                const data: number[] = recentProjects.map(
                    (project) => project.PROJECT_duration
                );

                this.chart = {
                    labels: titles,
                    datasets: [
                        {
                            label: 'Dauer [d]',
                            backgroundColor: 'rgb(255, 200, 200)',
                            borderColor: 'rgb(255, 200, 200)',
                            data,
                        },
                    ],
                };

                this.chartOptions = {
                    indexAxis: 'y',
                    maintainAspectRatio: true,
                    aspectRatio: 3.4,
                    plugins: {
                        legend: {
                            labels: {
                                color: 'rgb(255, 255, 255)',
                            },
                        },
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: 'rgb(255, 255, 255)',
                                font: {
                                    weight: 0.3,
                                },
                            },
                            grid: {
                                color: 'rgb(255, 255, 255)',
                                drawBorder: false,
                            },
                        },
                        y: {
                            ticks: {
                                color: 'rgb(255, 255, 255)',
                                font: {
                                    weight: 0.3,
                                },
                            },
                            grid: {
                                color: 'rgb(255, 255, 255)',
                                drawBorder: false,
                            },
                        },
                    },
                };
            },
            error: () => {
                this.messageService.add(
                    getMessageObject(
                        'error',
                        'Fehler beim Laden der Projekte',
                        'Die Projekte konnten nicht geladen werden. Bitte stelle sicher, dass du angemeldet bist und versuche es noch einmal.'
                    )
                );
            },
        });
    };

    ngOnInit(): void {
        this.store.dispatch(loadAllProjects({ accountID: this.accountID() }));

        this.createChart();
    }
}

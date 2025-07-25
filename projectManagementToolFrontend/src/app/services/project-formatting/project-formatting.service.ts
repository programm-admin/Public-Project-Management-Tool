import { Injectable } from '@angular/core';
import { Project, ProjectForDisplaying } from '../../shared/interfaces/Project';
import { Task, TaskForDisplaying } from '../../shared/interfaces/Task';

@Injectable({
    providedIn: 'root',
})
export class ProjectFormattingService {
    constructor() {}

    public mapToDisplayingProject = (
        project: Project
    ): ProjectForDisplaying => {
        return {
            Titel: project.PROJECT_title,
            Beschreibung: project.PROJECT_description,
            Startdatum: project.PROJECT_start,
            Enddatum: project.PROJECT_end,
            Projektdauer:
                project.PROJECT_duration !== 1
                    ? `${project.PROJECT_duration} Tage`
                    : `${project.PROJECT_duration} Tag`,
            'zuletzt geändert': project.PROJECT_lastModified,
            Kunde: project.PROJECT_customer,
            Ticketnummer: project.PROJECT_ticketNumber,
        };
    };

    public mapToDisplayingTask = (task: Task): TaskForDisplaying => ({
        Titel: task.TASK_title,
        Beschreibung: task.TASK_description,
        Startdatum: task.TASK_start,
        Enddatum: task.TASK_end,
        Aufgabendauer:
            task.TASK_duration !== 1
                ? `${task.TASK_duration} Tage`
                : `${task.TASK_duration} Tag`,
        'zuletzt geändert': task.TASK_lastModified,
        Mitglieder: task.TASK_Members.join(' '),
        Ticketnummer: task.TASK_ticketNumber,
    });
}

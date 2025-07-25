import { Task } from './Task';

export interface Project {
    [x: string]: any;
    PROJECT_title: string;
    PROJECT_description: string;
    PROJECT_id: string;
    PROJECT_start: Date;
    PROJECT_end: Date;
    PROJECT_duration: number;
    PROJECT_lastModified: Date;
    PROJECT_customer: string;
    PROJECT_ticketNumber: string;
    PROJECT_tasks: Task[];
    PROJECT_owner: string;
}

export interface ProjectForDisplaying {
    Titel: string;
    Beschreibung: string;
    Startdatum: Date;
    Enddatum: Date;
    Projektdauer: string;
    'zuletzt geändert': Date;
    Kunde: string;
    Ticketnummer: string;
}

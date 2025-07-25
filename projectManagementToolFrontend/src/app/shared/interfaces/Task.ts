export interface Task {
    TASK_title: string;
    TASK_description: string;
    TASK_id: string;
    TASK_start: Date;
    TASK_end: Date;
    TASK_duration: number;
    TASK_lastModified: Date;
    TASK_Members: string[];
    TASK_ticketNumber: string;
}

export interface TaskForDisplaying {
    Titel: string;
    Beschreibung: string;
    Startdatum: Date;
    Enddatum: Date;
    Aufgabendauer: string;
    'zuletzt geändert': Date;
    Mitglieder: string;
    Ticketnummer: string;
}

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Project } from '../../shared/interfaces/Project';
import { Task } from '../../shared/interfaces/Task';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { ProjectWithoutTasks } from '../../shared/interfaces/ProjectWithoutTasks';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE_USER_AUTH_TOKEN } from '../../shared/interfaces/CredentialsInterface';
import { BACKEND_URL } from '../../shared/variables/backend';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class ProjectDetailsServiceService {
    protected projectList: Project[] = [];
    protected projectListWithoutTasks: ProjectWithoutTasks[] = [];
    protected currentTask: Task | undefined;
    protected currentTasks: Task[] = [];
    currentProject: Project = {
        PROJECT_title: '',
        PROJECT_description: '',
        PROJECT_id: '',
        PROJECT_start: new Date(),
        PROJECT_end: new Date(),
        PROJECT_duration: 0,
        PROJECT_lastModified: new Date(),
        PROJECT_customer: '',
        PROJECT_ticketNumber: '',
        PROJECT_tasks: [],
        PROJECT_owner: '',
    };

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    getAllProjects = (accountID: string): Observable<ProjectWithoutTasks[]> => {
        let token: string = '';

        if (isPlatformBrowser(this.platformId)) {
            token = localStorage.getItem(LOCAL_STORAGE_USER_AUTH_TOKEN) ?? '';
        }

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer: ${token}`
        );

        return this.http.get<ProjectWithoutTasks[]>(
            `${BACKEND_URL}/projects/allWithoutTasks/?accountID=${accountID}`,
            { headers: headers }
        );
    };

    handleError = (error: HttpErrorResponse) => {
        alert(error.error.message);
    };

    getAllProjectsAsPromise = async (
        accountID: string
    ): Promise<ProjectWithoutTasks[]> => {
        const request = await fetch(
            `http://localhost:8000/projects/allWithoutTasks/?accountID=${accountID}`
        );
        const data = (await request.json()) as ProjectWithoutTasks[];

        return data;
    };

    getProjectList = (): ProjectWithoutTasks[] => {
        return this.projectListWithoutTasks;
    };

    getProjectById = async (
        accountID: string,
        id: string
    ): Promise<Project[]> => {
        const URL: string = `http://localhost:8000/projects/?projectID=${id}&accountID=${accountID}`;

        const fetchedProject = await fetch(URL);
        const fetchedProjectData: Project[] = <Project[]>(
            await fetchedProject.json()
        );

        return fetchedProjectData;
    };

    getTaskById = (projectID: string, taskID: string): Task | undefined => {
        const selectedProject: Project | undefined = this.projectList.find(
            (project) => project.PROJECT_id === projectID
        );

        if (!selectedProject) {
            return undefined;
        }

        return selectedProject?.PROJECT_tasks.find(
            (task) => task.TASK_id === taskID
        );
    };

    setCurrentTask = (newTask: Task) => {
        this.currentTask = newTask;
    };

    addNewTask = (newProjectTask: Task) => {
        // adding new task to task list of project
        this.currentProject.PROJECT_tasks.push(newProjectTask);
    };

    overrideProjectTasks = (newTask: Task) => {
        let overridenProjectTasks: Task[] = [];

        for (let loopTask of this.currentProject.PROJECT_tasks) {
            if (loopTask.TASK_id === newTask.TASK_id) {
                overridenProjectTasks.push(newTask);
            } else {
                overridenProjectTasks.push(loopTask);
            }
        }

        this.currentProject.PROJECT_tasks = overridenProjectTasks;
    };

    overrideProjectDetails = (newProjectDetails: ProjectWithoutTasks) => {
        // function for overriding all information (except task) about current selected project

        this.currentProject.PROJECT_title = newProjectDetails.PROJECT_title;
        this.currentProject.PROJECT_description =
            newProjectDetails.PROJECT_description;
        this.currentProject.PROJECT_start = newProjectDetails.PROJECT_start;
        this.currentProject.PROJECT_end = newProjectDetails.PROJECT_end;
        this.currentProject.PROJECT_duration =
            newProjectDetails.PROJECT_duration;
        this.currentProject.PROJECT_customer =
            newProjectDetails.PROJECT_customer;
        this.currentProject.PROJECT_ticketNumber =
            newProjectDetails.PROJECT_ticketNumber;
        this.currentProject.PROJECT_lastModified = new Date();
    };

    getCurrentUserTask = (taskID: string): Task | undefined => {
        if (!this.currentTask) {
            return undefined;
        }
        return this.currentTask;
    };

    setCurrentProject = (newProject: Project) => {
        this.currentProject = newProject;

        // for (let loopProject of newProject.PROJECT_tasks) {
        //     this.currentProject.PROJECT_tasks.push(loopProject);
        // }
    };

    getCurrentProjectByIdFromBackend = (
        projectId: string
    ): Observable<Project> => {
        let token: string = '';

        if (isPlatformBrowser(this.platformId)) {
            token = localStorage.getItem(LOCAL_STORAGE_USER_AUTH_TOKEN) ?? '';
            //   alert(JSON.stringify(this.currentProject));
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        });

        return this.http.get<Project>(
            `http://localhost:8000/projects/get-existing?projectID=${projectId}`,
            {
                headers,
            }
        );
    };

    getCurrentProject = (): Project => {
        return this.currentProject;
    };

    saveCurrentProject = (updatedProject: Project): Observable<Project> => {
        let token: string = '';

        if (isPlatformBrowser(this.platformId)) {
            token = localStorage.getItem(LOCAL_STORAGE_USER_AUTH_TOKEN) ?? '';
            //   alert(JSON.stringify(this.currentProject));
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        });

        return this.http.put<Project>(
            'http://localhost:8000/projects/edit-existing/',
            JSON.stringify(updatedProject),
            { headers }
        );
    };

    saveNewProject = (newProject: Project): Observable<Project> => {
        let token: string = '';

        if (isPlatformBrowser(this.platformId)) {
            token = localStorage.getItem(LOCAL_STORAGE_USER_AUTH_TOKEN) ?? '';
            //   alert(JSON.stringify(this.currentProject));
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer: ${token}`,
        });

        return this.http.post<Project>(
            'http://localhost:8000/projects/new',
            JSON.stringify(newProject),
            { headers }
        );
    };

    saveNewTask = (projectId: string, newTask: Task): Observable<Project> => {
        let token: string = '';

        if (isPlatformBrowser(this.platformId)) {
            token = localStorage.getItem(LOCAL_STORAGE_USER_AUTH_TOKEN) ?? '';
            //   alert(JSON.stringify(this.currentProject));
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer: ${token}`,
        });

        return this.http.post<Project>(
            `http://localhost:8000/projects/new-task/?projectID=${projectId}`,
            JSON.stringify(newTask),
            { headers }
        );
    };

    saveCurrentTask = (
        updatedTask: Task,
        projectId: string
    ): Observable<{ project: Project; task: Task }> => {
        let token: string = '';

        if (isPlatformBrowser(this.platformId)) {
            token = localStorage.getItem(LOCAL_STORAGE_USER_AUTH_TOKEN) ?? '';
            //   alert(JSON.stringify(this.currentProject));
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer: ${token}`,
        });

        return this.http.put<{ project: Project; task: Task }>(
            `http://localhost:8000/projects/edit-task/?projectID=${projectId}`,
            JSON.stringify(updatedTask),
            { headers }
        );
    };

    getTask = (projectID: string, taskID: string): Observable<Task> => {
        let token: string = '';

        if (isPlatformBrowser(this.platformId)) {
            token = localStorage.getItem(LOCAL_STORAGE_USER_AUTH_TOKEN) ?? '';
            //   alert(JSON.stringify(this.currentProject));
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer: ${token}`,
        });

        return this.http.get<Task>(
            `http://localhost:8000/projects/get-task/?projectID=${projectID}&taskID=${taskID}`,
            { headers }
        );
    };
}

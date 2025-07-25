import { createAction, props } from '@ngrx/store';
import { Project } from '../../shared/interfaces/Project';
import { ProjectWithoutTasks } from '../../shared/interfaces/ProjectWithoutTasks';

export const loadAllProjects = createAction(
    '[USER START COMPONENT] loadAllProjects',
    props<{ accountID: string }>()
);
export const loadAllProjectsSuccess = createAction(
    '[USER START COMPONENT] loadAllProjectsSuccess',
    props<{ projects: ProjectWithoutTasks[] }>()
);
export const loadAllProjectsFailure = createAction(
    '[USER START COMPONENT] loadAllProjectsFailure',
    props<{ error: string }>()
);

// load single project
export const loadProject = createAction(
    '[PROJECT MAIN COMPONENT] loadProject',
    props<{ projectID: string }>()
);
export const loadProjectSuccess = createAction(
    '[PROJECT MAIN COMPONENT] loadProjectSuccess',
    props<{ project: Project }>()
);
export const loadProjectFailure = createAction(
    '[PROJECT MAIN COMPONENT] loadProjectFailure',
    props<{ errorMessage: string }>()
);

// save new project
export const saveNewProject = createAction(
    '[PROJECT MAIN COMPONENT] saveNewProject',
    props<{ project: Project }>()
);
export const saveNewProjectSuccess = createAction(
    '[PROJECT MAIN COMPONENT] saveNewProjectSuccess',
    props<{ project: Project }>()
);
export const saveNewProjectFailure = createAction(
    '[PROJECT MAIN COMPONENT] saveNewProjectFailure',
    props<{ error: string }>()
);

// save edited project
export const saveProject = createAction(
    '[PROJECT MAIN COMPONENT] saveProject',
    props<{ project: Project }>()
);
export const saveProjectSuccess = createAction(
    '[PROJECT MAIN COMPONENT] saveProjectSuccess',
    props<{ project: Project }>()
);
export const saveProjectFailure = createAction(
    '[PROJECT MAIN COMPONENT] saveProjectFailure',
    props<{ error: string }>()
);

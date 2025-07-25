import { createReducer, on } from '@ngrx/store';
import { Project } from '../../shared/interfaces/Project';
import { DEFAULT_PROJECT } from '../../shared/variables/defaultProject';
import {
    loadAllProjects,
    loadAllProjectsFailure,
    loadAllProjectsSuccess,
    loadProject,
    loadProjectFailure,
    loadProjectSuccess,
    saveNewProject,
    saveNewProjectFailure,
    saveNewProjectSuccess,
    saveProject,
    saveProjectFailure,
    saveProjectSuccess,
} from './project.actions';
import { ProjectWithoutTasks } from '../../shared/interfaces/ProjectWithoutTasks';

export type ProjectStateType =
    | 'pending'
    | 'loading'
    | 'saving'
    | 'success'
    | 'error';

export interface ProjectState {
    projects: ProjectWithoutTasks[];
    selectedProject: Project;
    status: ProjectStateType;
    error: string | null;
}

export const initialProjectState: ProjectState = {
    projects: [],
    selectedProject: DEFAULT_PROJECT,
    status: 'pending',
    error: null,
};

export const projectReducer = createReducer(
    initialProjectState,
    on(loadAllProjects, (state) => ({
        ...state,
        status: 'loading' as const,
        error: null,
    })),
    on(loadAllProjectsSuccess, (state, { projects }) => ({
        ...state,
        projects,
        status: 'success' as const,
        error: null,
    })),
    on(loadAllProjectsFailure, (state, { error }) => ({
        ...state,
        status: 'error' as const,
        error,
    })),

    // actions for single project
    on(loadProject, (state, { projectID }) => ({
        ...state,
        selectedProject: { ...state.selectedProject, PROJECT_id: projectID },
        error: null,
        status: 'loading' as const,
    })),
    on(loadProjectSuccess, (state, { project }) => ({
        ...state,
        selectedProject: project,
        status: 'success' as const,
        error: null,
    })),
    on(loadProjectFailure, (state, { errorMessage }) => ({
        ...state,
        status: 'error' as const,
        error: errorMessage,
    })),

    // save new project
    on(saveNewProject, (state, { project }) => ({
        ...state,
        selectedProject: project,
        error: null,
        status: 'saving' as const,
    })),
    on(saveNewProjectSuccess, (state, { project }) => ({
        ...state,
        selectedProject: project,
        status: 'success' as const,
        error: null,
    })),
    on(saveNewProjectFailure, (state, { error }) => ({
        ...state,
        status: 'error' as const,
        error,
    })),

    // save edited project
    on(saveProject, (state, { project }) => ({
        ...state,
        selectedProject: project,
        error: null,
        status: 'saving' as const,
    })),
    on(saveProjectSuccess, (state, { project }) => ({
        ...state,
        selectedProject: project,
        status: 'success' as const,
        error: null,
    })),
    on(saveProjectFailure, (state, { error }) => ({
        ...state,
        status: 'error' as const,
        error,
    }))
);

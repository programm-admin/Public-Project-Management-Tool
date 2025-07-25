import { createReducer, on } from '@ngrx/store';
import { Task } from '../../shared/interfaces/Task';
import { DEFAULT_PROJECT } from '../../shared/variables/defaultProject';
import { ProjectStateType } from '../project/project.reducer';
import {
    createNewTask,
    createNewTaskFailure,
    createNewTaskSuccess,
    loadTask,
    loadTaskFailure,
    loadTaskSuccess,
    saveTask,
    saveTaskFailure,
    saveTaskSuccess,
} from './task.actions';

export interface TaskState {
    currentProjectId: string;
    currentTask: Task;
    status: ProjectStateType;
    error: string | null;
}

export const initialTaskState: TaskState = {
    currentProjectId: DEFAULT_PROJECT.PROJECT_id,
    currentTask: DEFAULT_PROJECT.PROJECT_tasks[0],
    status: 'pending',
    error: null,
};

export const taskReducer = createReducer(
    initialTaskState,
    on(createNewTask, (state, { task, projectId }) => ({
        currentProjectId: projectId,
        currentTask: task,
        status: 'loading' as const,
        error: null,
    })),
    on(createNewTaskSuccess, (state, { project }) => ({
        ...state,
        currentProjectId: project.PROJECT_id,
        status: 'success' as const,
        error: null,
    })),
    on(createNewTaskFailure, (state, { error }) => ({
        ...state,
        status: 'error' as const,
        error,
    })),

    // save edited task
    on(saveTask, (state, { task, projectId }) => ({
        currentProjectId: projectId,
        currentTask: task,
        status: 'loading' as const,
        error: null,
    })),
    on(saveTaskSuccess, (state, { task, project }) => ({
        currentProjectId: project.PROJECT_id,
        currentTask: task,
        status: 'success' as const,
        error: null,
    })),
    on(saveTaskFailure, (state, { error }) => ({
        ...state,
        status: 'error' as const,
        error,
    })),

    // load single task
    on(loadTask, (state, { taskID, projectId }) => ({
        currentProjectId: projectId,
        currentTask: { ...state.currentTask, TASK_id: taskID },
        status: 'loading' as const,
        error: null,
    })),
    on(loadTaskSuccess, (state, { task }) => ({
        ...state,
        currentTask: task,
        status: 'success' as const,
        error: null,
    })),
    on(loadTaskFailure, (state, { error }) => ({
        ...state,
        status: 'error' as const,
        error,
    }))
);

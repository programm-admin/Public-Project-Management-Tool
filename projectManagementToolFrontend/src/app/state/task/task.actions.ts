import { createAction, props } from '@ngrx/store';
import { Task } from '../../shared/interfaces/Task';
import { Project } from '../../shared/interfaces/Project';

export const createNewTask = createAction(
    '[NEW TASK COMPONENT] createNewTask',
    props<{ task: Task; projectId: string }>()
);
export const createNewTaskSuccess = createAction(
    '[NEW TASK COMPONENT] createNewTaskSuccess',
    props<{ project: Project }>()
);
export const createNewTaskFailure = createAction(
    '[NEW TASK COMPONENT] createNewTaskFailure',
    props<{ error: string }>()
);

// load single task
export const loadTask = createAction(
    '[TASK MAIN COMPONENT] loadTask',
    props<{ taskID: string; projectId: string }>()
);
export const loadTaskSuccess = createAction(
    '[TASK MAIN COMPONENT] loadTaskSuccess',
    props<{ task: Task }>()
);
export const loadTaskFailure = createAction(
    '[TASK MAIN COMPONENT] loadTaskFailure',
    props<{ error: string }>()
);

// save edited task
export const saveTask = createAction(
    '[TASK MAIN COMPONENT] saveTask',
    props<{ task: Task; projectId: string }>()
);
export const saveTaskSuccess = createAction(
    '[TASK MAIN COMPONENT] saveTaskSuccess',
    props<{ project: Project; task: Task }>()
);

export const saveTaskFailure = createAction(
    '[TASK MAIN COMPONENT] saveTaskFailure',
    props<{ error: string }>()
);

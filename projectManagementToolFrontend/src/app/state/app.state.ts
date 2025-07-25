import { ProjectState } from './project/project.reducer';
import { TaskState } from './task/task.reducer';

export interface AppState {
    projectState: ProjectState;
    taskState: TaskState;
}

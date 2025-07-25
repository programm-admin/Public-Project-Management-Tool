import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('task');

export const selectCurrenTask = createSelector(
  selectTaskState,
  (state: TaskState) => state.currentTask
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from './project.reducer';

export const selectProjectState =
  createFeatureSelector<ProjectState>('project');

export const selectAllProjects = createSelector(
  selectProjectState,
  (state: ProjectState) => state.projects
);

export const selectSelectedProject = createSelector(
  selectProjectState,
  (state: ProjectState) => state.selectedProject
);

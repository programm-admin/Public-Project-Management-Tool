import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectDetailsServiceService } from '../../services/project/project-details-service.service';
import {
    createNewTask,
    createNewTaskFailure,
    createNewTaskSuccess,
    loadTask,
    loadTaskSuccess,
    saveTask,
    saveTaskFailure,
    saveTaskSuccess,
} from './task.actions';
import { catchError, map, mergeMap } from 'rxjs';

@Injectable()
export class TaskEffects {
    private actions$ = inject(Actions);

    constructor(private projectsDetailsService: ProjectDetailsServiceService) {}

    saveNewTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createNewTask),
            mergeMap((action) =>
                this.projectsDetailsService
                    .saveNewTask(action.projectId, action.task)
                    .pipe(
                        map((response) =>
                            createNewTaskSuccess({ project: response })
                        ),
                        catchError((error) => [createNewTaskFailure({ error })])
                    )
            )
        )
    );

    saveTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveTask),
            mergeMap((action) =>
                this.projectsDetailsService
                    .saveCurrentTask(action.task, action.projectId)
                    .pipe(
                        map((response) =>
                            saveTaskSuccess({
                                project: response.project,
                                task: response.task,
                            })
                        ),
                        catchError((error) => [saveTaskFailure({ error })])
                    )
            )
        )
    );

    loadExistingTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTask),
            mergeMap((action) =>
                this.projectsDetailsService
                    .getTask(action.projectId, action.taskID)
                    .pipe(
                        map((response) =>
                            loadTaskSuccess({
                                task: response,
                            })
                        ),
                        catchError((error) => [saveTaskFailure({ error })])
                    )
            )
        )
    );
}

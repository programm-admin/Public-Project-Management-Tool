import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectDetailsServiceService } from '../../services/project/project-details-service.service';
import {
    loadAllProjects,
    loadAllProjectsFailure,
    loadAllProjectsSuccess,
    loadProject,
    loadProjectFailure,
    loadProjectSuccess,
    saveNewProject,
    saveNewProjectFailure,
    saveProject,
    saveProjectFailure,
    saveProjectSuccess,
} from './project.actions';
import { catchError, map, mergeMap, switchMap, tap, pipe } from 'rxjs';
import { LOCAL_STORAGE_USER_ACCOUNT_ID } from '../../shared/interfaces/CredentialsInterface';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class ProjectEffects {
    accountId: string = '';
    private actions$ = inject(Actions);

    constructor(
        private projectsDetailsService: ProjectDetailsServiceService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        let accountID: string = '';

        if (isPlatformBrowser(this.platformId)) {
            accountID =
                localStorage.getItem(LOCAL_STORAGE_USER_ACCOUNT_ID) ?? '';
        }

        this.accountId = accountID;
    }

    //load all projects
    loadProjects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadAllProjects),
            mergeMap(() =>
                this.projectsDetailsService.getAllProjects(this.accountId).pipe(
                    map((response) =>
                        loadAllProjectsSuccess({ projects: response })
                    ),
                    catchError((error) => [loadAllProjectsFailure({ error })])
                )
            )
        );
    });

    // load selected project
    loadProject$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadProject),
            mergeMap((action) =>
                this.projectsDetailsService
                    .getCurrentProjectByIdFromBackend(action.projectID)
                    .pipe(
                        map((response) => {
                            return loadProjectSuccess({ project: response });
                        }),
                        catchError((error) => [
                            loadProjectFailure({ errorMessage: error }),
                        ])
                    )
            )
        );
    });

    saveNewProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveNewProject),
            mergeMap((action) =>
                this.projectsDetailsService.saveNewProject(action.project).pipe(
                    map((response) =>
                        saveProjectSuccess({ project: response })
                    ),
                    catchError((error) => [saveNewProjectFailure({ error })])
                )
            )
        )
    );

    saveProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveProject),
            mergeMap((action) =>
                this.projectsDetailsService
                    .saveCurrentProject(action.project)
                    .pipe(
                        map((response) =>
                            saveProjectSuccess({ project: response })
                        ),
                        catchError((error) => [saveProjectFailure({ error })])
                    )
            )
        )
    );
}

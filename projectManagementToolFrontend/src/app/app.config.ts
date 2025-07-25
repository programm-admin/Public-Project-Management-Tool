import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';

import { routes } from './app.routes';
import {
    provideClientHydration,
    withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { projectReducer } from './state/project/project.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProjectEffects } from './state/project/project.effects';
import { taskReducer } from './state/task/task.reducer';
import { TaskEffects } from './state/task/task.effects';
import { CustomReuseStrategy } from './core/router/routerStrategy';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Material from '@primeng/themes/material';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from './mypreset';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(withEventReplay()),
        provideAnimationsAsync(),
        provideHttpClient(withFetch()),
        provideStore(),
        provideState({ name: 'project', reducer: projectReducer }),
        provideState({ name: 'task', reducer: taskReducer }),
        provideEffects([ProjectEffects, TaskEffects]),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: MyPreset,
            },
        }),
        MessageService,
    ],
};

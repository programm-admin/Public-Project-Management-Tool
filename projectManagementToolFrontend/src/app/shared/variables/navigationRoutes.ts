export const NAVIGATION_ROUTES: string[][] = [
    ['Start', ''],
    ['Impressum', 'footer/impressum'],
    ['About', 'footer/about'],
    ['Login', 'login/existing', 'existing'],
    ['Registrieren', 'login/register', 'register'],
    ['Nutzer', 'user'],
    ['Projektdetails', 'project/:id'],
    ['Aufgabendetails', 'project/:id/task/:taskId'],
    ['Fehler', 'error'],
    ['Neues Projekt', 'new/project'],
    ['Neue Aufgabe', 'project/:id/new/task'],
];

export interface navigationRoute {
    title: string;
    relativePathInModule: string;
    fullPath: string;
    showInRoutesOnlyList: boolean;
}

export interface moduleRoute {
    moduleTitle: string;
    modulePath: string;
    moduleRoutes: navigationRoute[];
}

export const NAVIGATION_LIST: moduleRoute[] = [
    {
        moduleTitle: 'main',
        modulePath: '',
        moduleRoutes: [
            {
                title: 'Start',
                relativePathInModule: '',
                fullPath: '',
                showInRoutesOnlyList: true,
            },
        ],
    },
    {
        moduleTitle: 'authentication',
        modulePath: 'auth',
        moduleRoutes: [
            {
                title: 'Login',
                relativePathInModule: 'login',
                fullPath: 'auth/login',
                showInRoutesOnlyList: true,
            },
            {
                title: 'Registrieren',
                relativePathInModule: 'register',
                fullPath: 'auth/register',
                showInRoutesOnlyList: true,
            },
        ],
    },
    {
        moduleTitle: 'user',
        modulePath: 'user',
        moduleRoutes: [
            {
                title: 'Nutzer',
                relativePathInModule: '',
                fullPath: '/user',
                showInRoutesOnlyList: true,
            },
        ],
    },
    {
        moduleTitle: 'AppFooter',
        modulePath: 'footer',
        moduleRoutes: [
            {
                title: 'About',
                relativePathInModule: 'about',
                fullPath: 'footer/about',
                showInRoutesOnlyList: true,
            },
            {
                title: 'Impressum',
                relativePathInModule: 'impressum',
                fullPath: 'footer/impressum',
                showInRoutesOnlyList: true,
            },
        ],
    },
    {
        moduleTitle: 'Projekt',
        modulePath: 'project',
        moduleRoutes: [
            {
                title: 'Neues Projekt',
                relativePathInModule: 'new',
                fullPath: 'project/new',
                showInRoutesOnlyList: true,
            },
            {
                title: 'Projektdetails',
                relativePathInModule: ':id',
                fullPath: 'project/:id',
                showInRoutesOnlyList: false,
            },
            {
                title: 'Neue Aufgabe',
                relativePathInModule: ':id/new/task',
                fullPath: 'project/:id/new/task',
                showInRoutesOnlyList: false,
            },
            {
                title: 'Aufgabendetails',
                relativePathInModule: ':id/task/:taskId',
                fullPath: 'project/:id/task/:taskId',
                showInRoutesOnlyList: false,
            },
        ],
    },
    {
        moduleTitle: 'Katana',
        modulePath: 'katana',
        moduleRoutes: [
            {
                title: 'Katana-Home',
                relativePathInModule: '',
                fullPath: 'katana/',
                showInRoutesOnlyList: true,
            },
        ],
    },
];

export const getNavigationListRoutesOnly = (): navigationRoute[] => {
    const navigationRoutesList: navigationRoute[] = [];

    for (const module of NAVIGATION_LIST) {
        for (const route of module.moduleRoutes.filter(
            (navRoute) => navRoute.showInRoutesOnlyList === true
        )) {
            // add only routes that should be accessible via link
            navigationRoutesList.push(route);
        }
    }

    return navigationRoutesList;
};

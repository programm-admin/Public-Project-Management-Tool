import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ComponentService {
    private isSidebarOpenSubject: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);
    public isSidebarOpenSubject$: Observable<boolean> =
        this.isSidebarOpenSubject.asObservable();

    constructor() {}

    public updateIsSidebarOpenSubject = (status: boolean) => {
        this.isSidebarOpenSubject.next(status);
    };
}

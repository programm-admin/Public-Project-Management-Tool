import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
} from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // throw new Error('Method not implemented.');
    return null;
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true; // Verhindert das Zwischenspeichern der Route
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false; // Verhindert das Anhängen einer zwischengespeicherten Route
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // Keine Speicherung
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot
  ): boolean {
    return true; // Erzwingt, dass die Route immer neu geladen wird
  }
}

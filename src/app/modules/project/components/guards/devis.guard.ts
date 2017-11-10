import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { select } from '@angular-redux/store';


@Injectable()
export class DevisGuard implements CanLoad, CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.devisLoading.map(loading => !loading);
    }

    @select(['projectDevis', 'loading'])
    devisLoading: Observable<boolean>;

    constructor() {
        this.devisLoading.map(loading => !loading).subscribe(l => console.log(l))
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return this.devisLoading.map(loading => !loading);
    }
}

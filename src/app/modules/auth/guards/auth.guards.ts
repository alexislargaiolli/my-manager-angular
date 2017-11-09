import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store.types';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

    @select(['session', 'authenticated'])
    authenticated: Observable<boolean>;

    constructor(private router: Router, private _ngRedux: NgRedux<IAppState>) { }

    canActivate(): Observable<boolean> {
        return this.authenticated;
    }
}

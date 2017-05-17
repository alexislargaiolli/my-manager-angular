import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CurrentSession } from 'app/modules/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store.types';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private _ngRedux: NgRedux<IAppState>) {

    }

    canActivate(): boolean {
        if (this._ngRedux.getState().session.authenticated) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}

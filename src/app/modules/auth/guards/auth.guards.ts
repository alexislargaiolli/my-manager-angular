import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CurrentSession } from 'app/modules/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private currentSession: CurrentSession) { }

    canActivate(): Promise<boolean> {
        this.currentSession.authenticated.then(authenticated => {
            if (!authenticated) {
                this.router.navigate(['/login']);
            }
        });
        return this.currentSession.authenticated;
    }
}
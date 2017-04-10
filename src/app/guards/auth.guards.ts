import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    canActivate(): Promise<boolean> {
        this.authenticationService.authenticated.then(authenticated=>{
            if(!authenticated){
                this.router.navigate(['/login']);
            }
        });
        return this.authenticationService.authenticated;
    }
}
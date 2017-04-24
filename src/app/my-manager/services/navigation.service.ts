import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {

    constructor(protected router: Router) { }

    public goToHome() {
        this.router.navigate(['home']);
    }

    public goToLogin() {
        this.router.navigate(['login']);
    }

}
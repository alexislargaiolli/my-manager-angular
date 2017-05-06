import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Devis } from 'app/my-manager/model/devis.model';

@Injectable()
export class NavigationService {

    constructor(protected router: Router) { }

    public goToHome() {
        this.router.navigate(['home']);
    }

    public goProjectDashboard() {
        this.router.navigate(['project']);
    }

    public goToDevis(devis: Devis) {
        this.router.navigate(['devis', { id: devis.id }]);
    }

    public goToLogin() {
        this.router.navigate(['login']);
    }

}
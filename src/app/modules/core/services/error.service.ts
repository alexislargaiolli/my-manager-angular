import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable()
export class ErrorService {

    constructor(private notificationService: NotificationService, private router: Router) { }

    public handleNetworkError(source: string, status: number, statusText: string, body: any) {
        let msg = null;
        if (status === 401) {
            msg = 'Authentification requise.';
            this.router.navigate(['login']);
        } else if (status === 403) {
            msg = 'Accès interdit.';
        }
        try {
            msg = body.err || body.error || 'Server error';
            msg = msg.err || msg.error || msg.message || msg;
        } catch (e) {
            if (msg == null) {
                msg = 'Erreur inconnue';
            }
        }
        console.error('[%s] %d (%s) : %s', source, status, statusText, msg);
        this.notificationService.addError(msg);
        return Observable.throw(msg);
    }

}

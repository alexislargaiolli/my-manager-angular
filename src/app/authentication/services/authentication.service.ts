import { Injectable, Optional } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppSettings } from 'app/app-settings';
import { NotificationService } from 'app/core/services/notification.service';
import { EventsService } from 'app/core/services/event.service';
import { CurrentSession } from 'app/core/services/session.service';
import { BaseHttpService } from 'app/core/generics/repositories/base-http.service';
import { ErrorService } from 'app/core/services/error.service';
import { BackendConfig } from 'app/core/interfaces/backend.config';

@Injectable()
export class AuthenticationService {
    private config: BackendConfig;

    constructor(
        protected http: Http,
        protected notificationService: NotificationService,
        protected eventsService: EventsService,
        protected currentSession: CurrentSession,
        protected baseHttpService: BaseHttpService) {
    }

    login(username: string, password: string): Observable<boolean> {
        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        const url = `${this.baseHttpService.config.baseUrl}/${this.baseHttpService.config.loginEndpoint}`;
        const body = JSON.stringify({ email: username, password: password });
        return this.baseHttpService.handleResponse(this.http.post(url, body, options)).map((response: Response) => {
            // login successful if there's a jwt _token in the response
            const token = response.json().id;
            const id = response.json().userId;
            if (token && id) {
                this.currentSession.setSession(id, token);
                // return session to userIndicate successful login
                return true;
            } else {
                this.currentSession.destroySession();
                // return false to indicate failed login
                return false;
            }
        });
    }

    logout(): Observable<boolean> {
        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.currentSession.token
            })
        });
        return this.http.post(`${this.baseHttpService.config.baseUrl}/${this.baseHttpService.config.logoutEndpoint}`, {}, options)
            .map((response: Response) => {
                this.currentSession.destroySession();
                return true;
            });
    }
}
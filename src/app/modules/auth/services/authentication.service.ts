import { Injectable, Optional } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppSettings } from 'app/app-settings';
import { NotificationService, EventsService, CurrentSession, BaseHttpService, ErrorService, BackendConfig } from 'app/modules/core';

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

    login(username: string, password: string) {
        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        const url = `${this.baseHttpService.config.baseUrl}/${this.baseHttpService.config.loginEndpoint}`;
        const body = JSON.stringify({ email: username, password: password });
        return this.baseHttpService.handleResponse(this.http.post(url, body, options));
    }

    logout() {
        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.currentSession.token
            })
        });
        return this.http.post(`${this.baseHttpService.config.baseUrl}/${this.baseHttpService.config.logoutEndpoint}`, {}, options);
    }
}

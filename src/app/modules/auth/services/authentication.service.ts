import { Injectable, Optional } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppSettings } from 'app/app-settings';
import { NotificationService, EventsService, BaseHttpService, ErrorService, BackendConfig } from 'app/modules/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store.types';

@Injectable()
export class AuthenticationService {
    private config: BackendConfig;

    constructor(
        protected http: Http,
        protected notificationService: NotificationService,
        protected eventsService: EventsService,
        protected baseHttpService: BaseHttpService, private _ngRedux: NgRedux<IAppState>) {
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
        //To replace by BaseToken implementation
        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this._ngRedux.getState().session.token
            })
        });
        return this.http.post(`${this.baseHttpService.config.baseUrl}/${this.baseHttpService.config.logoutEndpoint}`, {}, options);
    }

    register(data) {
        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        const url = `${this.baseHttpService.config.baseUrl}/${this.baseHttpService.config.registerEndpoint}`;
        const body = JSON.stringify(data);
        return this.baseHttpService.handleResponse(this.http.post(url, body, options));
    }
}

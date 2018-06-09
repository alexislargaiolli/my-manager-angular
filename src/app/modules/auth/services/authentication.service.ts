import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendConfig, BaseHttpService, NotificationService } from 'app/modules/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    private config: BackendConfig;

    constructor(
        protected http: HttpClient,
        protected notificationService: NotificationService,
        protected baseHttpService: BaseHttpService) {
    }

    login(username: string, password: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const url = `${this.baseHttpService.config.baseUrl}/${this.baseHttpService.config.loginEndpoint}`;
        const body = JSON.stringify({ email: username, password: password });
        return this.baseHttpService.handleResponse(this.http.post(url, body, { headers }));
    }

    logout() {
        return this.http.post(`${this.baseHttpService.config.baseUrl}/${this.baseHttpService.config.logoutEndpoint}`, {});
    }

    register(data) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const url = `${this.baseHttpService.config.baseUrl}/${this.baseHttpService.config.registerEndpoint}`;
        const body = JSON.stringify(data);
        return this.baseHttpService.handleResponse(this.http.post(url, body, { headers }));
    }
}

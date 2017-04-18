import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppSettings } from 'app/app-settings';
import { NotificationService } from 'app/core/services/notification.service';
import { EventsService } from 'app/core/services/event.service';
import { CurrentSession } from 'app/core/services/session.service';

@Injectable()
export class AuthenticationService {
    protected BASE_URL = AppSettings.API_ENDPOINT;

    constructor(private http: Http,
        protected notificationService: NotificationService,
        private eventsService: EventsService,
        private currentSession: CurrentSession) { }

    login(username: string, password: string): Observable<boolean> {
        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        return this.http.post(`${this.BASE_URL}/mmusers/login`, JSON.stringify({ email: username, password: password }), options)
            .map((response: Response) => {
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

    logout(): void {
        this.currentSession.destroySession();
    }
}
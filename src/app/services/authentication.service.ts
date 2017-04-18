import { NotificationService } from './notification.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EventsService, AppEvent } from 'app/services/event.service';
import { AppSettings } from 'app/app-settings';

export interface Session {
    userId: number;
    token: string;
}

@Injectable()
export class AuthenticationService {
    private session: Session;
    protected BASE_URL = AppSettings.API_ENDPOINT;

    public authenticated: Promise<boolean>;

    constructor(private http: Http, protected notificationService: NotificationService, private eventsService: EventsService) { }

    initialize() {
        const session = localStorage.getItem('currentSession');
        if (session) {
            const sessionObj = JSON.parse(session);
            if (sessionObj && sessionObj.userId && sessionObj.token) {
                this.setSession(sessionObj.userId, sessionObj.token);
                return;
            }
        }
        this.destroySession();
    }

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
                    this.setSession(id, token);
                    // return session to userIndicate successful login
                    return true;
                } else {
                    this.destroySession();
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        this.destroySession();
    }

    private setSession(userId: number, token: string) {
        this.session = { userId: userId, token: token };
        // store username and jwt _token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentSession', JSON.stringify(this.session));
        this.authenticated = Promise.resolve(true);
        this.eventsService.broadcast('AppEvent.AUTHENTICATION_SUCCESS', this.session);
    }

    private destroySession() {
        this.session = { userId: null, token: null };
        localStorage.removeItem('currentSession');
        this.authenticated = Promise.resolve(false);
        this.eventsService.broadcast(AppEvent.LOGGED_OUT);
    }

    get token() {
        return this.session.token;
    }

    get userId() {
        return this.session.userId;
    }
}
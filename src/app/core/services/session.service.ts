import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { EventsService, AppEvent } from './event.service';
import { UserSession } from 'app/core/models/user-session.model';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class CurrentSession {

    private session: UserSession;
    public authenticated: Promise<boolean>;

    constructor(private eventsService: EventsService, private userService: UserService) { }

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

    public setSession(userId: number, token: string) {
        this.session = { userId: userId, token: token, username: '' };
        // store username and jwt _token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentSession', JSON.stringify(this.session));
        this.authenticated = Promise.resolve(true);
        this.eventsService.broadcast(AppEvent.AUTHENTICATION_SUCCESS, this.session);

        this.retriveUserInfo().then(() => console.log(this.session));
    }

    public destroySession() {
        this.session = { userId: null, token: null, username: null };
        localStorage.removeItem('currentSession');
        this.authenticated = Promise.resolve(false);
        this.eventsService.broadcast(AppEvent.LOGGED_OUT);
    }

    private retriveUserInfo(): Promise<any> {
        return this.userService.me(this.session).toPromise().then(user => this.session.username = user['username']);
    }

    get token() {
        return this.session.token;
    }

    get userId() {
        return this.session.userId;
    }

    get username() {
        return this.session.username;
    }

    get userSession(): UserSession {
        return this.session;
    }
}

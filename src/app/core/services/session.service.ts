import { Injectable } from '@angular/core';
import { UserSession } from 'app/core/models/user-session.model';
import { EventsService, AppEvent } from 'app/core/services/event.service';

@Injectable()
export class CurrentSession {

    private session: UserSession;
    public authenticated: Promise<boolean>;

    constructor(private eventsService: EventsService) { }

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
        this.session = { userId: userId, token: token };
        // store username and jwt _token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentSession', JSON.stringify(this.session));
        this.authenticated = Promise.resolve(true);
        this.eventsService.broadcast(AppEvent.AUTHENTICATION_SUCCESS, this.session);
    }

    public destroySession() {
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
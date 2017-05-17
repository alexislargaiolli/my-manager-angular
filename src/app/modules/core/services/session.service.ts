import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { UserSession } from '../models/user-session.model';
import { User } from '../models/user.model';
import { EventsService, AppEvent } from './event.service';
import { RepositoriesService } from './repositories/repositories.service';
import { NgRedux } from '@angular-redux/store';
import { getTestBed } from '@angular/core/testing';
import { IAppState } from 'app/modules/store';

@Injectable()
export class CurrentSession {

    private session: UserSession;
    public authenticated: Promise<boolean>;

    constructor(private eventsService: EventsService, private repo: RepositoriesService, private _ngRedux: NgRedux<IAppState>) { }

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
        // this.session = new UserSession(userId, token);
        // // store username and jwt _token in local storage to keep user logged in between page refreshes
        // localStorage.setItem('currentSession', JSON.stringify(this.session));
        // this.authenticated = Promise.resolve(true);
        // this.eventsService.broadcast(AppEvent.AUTHENTICATION_SUCCESS, this.session);

        // this.retriveUserInfo().then(u => { });
    }

    public destroySession() {
        // this.session = null;
        // localStorage.removeItem('currentSession');
        // this.authenticated = Promise.resolve(false);
        // this.eventsService.broadcast(AppEvent.LOGGED_OUT);
    }

    private retriveUserInfo(): Promise<any> {
        return this.repo.get(User.name, this.session.userId).exec().toPromise().then(user => {
            this.session.user = user;
        });
    }

    get token() {
        return this._ngRedux.getState().session.token;
    }

    get userId() {
        return this._ngRedux.getState().session.userId;
    }

    get username() {
        return this._ngRedux.getState().session.user.username;
    }

    get user() {
        return this._ngRedux.getState().session.user;
    }

    get userSession(): UserSession {
        return this._ngRedux.getState().session;
    }
}

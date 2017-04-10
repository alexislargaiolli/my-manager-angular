import { NotificationService } from './notification.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

interface Session {
    userId: number;
    username: string;
    token: string;
}

@Injectable()
export class AuthenticationService {
    private session: Session;
    protected BASE_URL = "http://localhost:1337";

    public authenticated: Promise<boolean>;

    constructor(private http: Http, protected notificationService: NotificationService) { }

    initialize() {
        let session = localStorage.getItem('currentSession');
        if (session) {
            let sessionObj = JSON.parse(session);
            let token = sessionObj && sessionObj.token;
            if (token) {
                this.authenticated = this.verifyToken(token);
                this.authenticated.then(info => this.setSession(sessionObj.userId, sessionObj.username, token));
                return;
            }            
        }
        this.destroySession();
    }

    verifyToken(token: string): Promise<boolean> {
        let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'x-access-token': token }) });
        return this.http.get(`${this.BASE_URL}/authenticated`, options)
            .toPromise()
            .then(response => response.json());
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post(`${this.BASE_URL}/authenticate`, JSON.stringify({ email: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt _token in the response
                let token = response.json().token;
                let id = response.json().userId;
                if (token && id) {
                    this.setSession(id, username, token);
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

    private setSession(userId: number, username: string, token: string) {
        this.session = { userId: userId, username: username, token: token };
        console.table([this.session]);
        // store username and jwt _token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentSession', JSON.stringify(this.session));
        this.authenticated = Promise.resolve(true);
    }

    private destroySession() {
        this.session = { userId: null, username: null, token: null };
        localStorage.removeItem('currentSession');
        this.authenticated = Promise.resolve(false);
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
}
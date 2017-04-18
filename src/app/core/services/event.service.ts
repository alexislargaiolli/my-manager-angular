import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

export enum AppEvent {
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILED,
    LOGGED_OUT
}

@Injectable()
export class EventsService {
    private listeners;
    private eventsSubject;
    private events;

    constructor() {
        this.listeners = {};
        this.eventsSubject = new Rx.Subject();

        this.events = Rx.Observable.from(this.eventsSubject);

        this.events.subscribe(
            ({ name, args }) => {
                if (this.listeners[name]) {
                    for (const listener of this.listeners[name]) {
                        listener(...args);
                    }
                }
            });
    }

    on(name, listener) {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }

        this.listeners[name].push(listener);
    }

    broadcast(name, ...args) {
        this.eventsSubject.next({
            name,
            args
        });
    }
}
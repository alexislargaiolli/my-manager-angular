import { MyNotification, NotificationType } from '../models/my-notification.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class NotificationService {
    private notifications$: Subject<MyNotification>;
    private idSequence = 0;

    constructor() {
        this.notifications$ = new Subject<MyNotification>();
    }

    public addInfo(message: string) {
        this.addNotification(message, NotificationType.INFO);
    }

    public addWarn(message: string) {
        this.addNotification(message, NotificationType.WARNING);
    }

    public addError(message: string) {
        this.addNotification(message, NotificationType.ERROR);
    }

    private addNotification(msg: string, type: NotificationType) {
        this.notifications$.next({
            id: this.idSequence,
            type: type,
            message: msg
        });
        this.idSequence++;
    }

    public getNotification(): Observable<MyNotification> {
        return this.notifications$.asObservable();
    }
}
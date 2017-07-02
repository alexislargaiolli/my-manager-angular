import { MyNotification, NotificationType } from '../models/my-notification.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { NotificationActions } from '../../store/reducers/notification/notification.actions';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class NotificationService {
    private idSequence = 0;

    constructor(private notificationActions: NotificationActions) {
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
        const notification = {
            id: this.idSequence,
            type: type,
            message: msg
        };
        this.idSequence++;
        this.notificationActions.dispatchAddNotification(notification);
    }

    public removeNotification(notification: MyNotification) {
        this.notificationActions.dispatchRemoveNotification(notification);
    }
}

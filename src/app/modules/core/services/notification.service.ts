import { NotificationSaveSuccess, NotificationWarning, NotificationCreateSuccess, NotificationDeleteSuccess } from './../models/my-notification.model';
import { MyNotification, NotificationType, NotificationError } from '../models/my-notification.model';
import { Injectable } from '@angular/core';
import { NotificationActions } from '../../store/reducers/notification/notification.actions';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class NotificationService {
    private static ICON_SAVE = 'save';
    private static ICON_ERROR = 'save';
    private static ICON_WARNING = 'save';

    constructor(private notificationActions: NotificationActions) {
    }

    public addInfo(message: string) {
        this.notificationActions.dispatchAddNotification(new MyNotification(NotificationType.INFO, message));
    }

    public addSaveSuccess(message: string) {
        this.notificationActions.dispatchAddNotification(new NotificationSaveSuccess(message));
    }

    public addCreateSuccess(message: string) {
        this.notificationActions.dispatchAddNotification(new NotificationCreateSuccess(message));
    }

    public addRemoveSuccess(message: string) {
        this.notificationActions.dispatchAddNotification(new NotificationDeleteSuccess(message));
    }

    public addWarn(message: string) {
        this.notificationActions.dispatchAddNotification(new NotificationWarning(message));
    }

    public addError(message: string) {
        this.notificationActions.dispatchAddNotification(new NotificationError(message));
    }

    public removeNotification(notification: MyNotification) {
        this.notificationActions.dispatchRemoveNotification(notification);
    }
}

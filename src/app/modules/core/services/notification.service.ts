import { MyNotification, NotificationType, NotificationIcon } from '../models/my-notification.model';
import { Injectable } from '@angular/core';
import { NotificationActions } from '../../store/reducers/notification/notification.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/modules/store/store.types';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/publish';

@Injectable()
export class NotificationService {
    private static ICON_SAVE = 'save';
    private static ICON_ERROR = 'save';
    private static ICON_WARNING = 'save';

    constructor(private notificationActions: NotificationActions, private _ngRedux: NgRedux<IAppState>) {
    }

    public addNotif(message: String, type = NotificationType.INFO, icon?: String) {
        this.notificationActions.dispatchAddNotification(new MyNotification(message, type, icon));
    }

    public removeNotification(notification: MyNotification) {
        this.notificationActions.dispatchRemoveNotification(notification);
    }

    public addInfo(message: string) {
        this.notificationActions.dispatchAddNotification(new MyNotification(message));
    }

    public addSaveSuccess(message: string) {
        this.notificationActions.dispatchAddNotification(new MyNotification(message, NotificationType.SUCCESS, NotificationIcon.SAVE));
    }

    public addCreateSuccess(message: string) {
        this.notificationActions.dispatchAddNotification(new MyNotification(message, NotificationType.SUCCESS, NotificationIcon.CREATE));
    }

    public addRemoveSuccess(message: string) {
        this.notificationActions.dispatchAddNotification(new MyNotification(message, NotificationType.SUCCESS, NotificationIcon.DELETE));
    }

    public addWarn(message: string) {
        this.notificationActions.dispatchAddNotification(new MyNotification(message, NotificationType.WARNING, NotificationIcon.WARNING));
    }

    public addError(message: string) {
        this.notificationActions.dispatchAddNotification(new MyNotification(message, NotificationType.ERROR, NotificationIcon.ERROR));
    }

    public addStoreChangeNotif<T>(selector: string[], getMessage: (elt: T) => string, type = NotificationType.INFO, icon?: String): Subscription {
        let obs = this._ngRedux.select(selector).filter(e => e != null).publish();
        obs.connect();
        return obs.subscribe((elt: T) => {
            this.addNotif(getMessage(elt), type, icon);
        });
    }

    public addStoreChangeSaveNotif<T>(selector: string[], getMessage: (elt: T) => string): Subscription {
        return this.addStoreChangeNotif(selector, getMessage, NotificationType.SUCCESS, NotificationIcon.SAVE);
    }

    public addStoreChangeCreateNotif<T>(selector: string[], getMessage: (elt: T) => string): Subscription {
        return this.addStoreChangeNotif(selector, getMessage, NotificationType.SUCCESS, NotificationIcon.CREATE);
    }

    public addStoreChangeDeleteNotif<T>(selector: string[], getMessage: (elt: T) => string): Subscription {
        return this.addStoreChangeNotif(selector, getMessage, NotificationType.SUCCESS, NotificationIcon.DELETE);
    }

    public addStoreChangeWarningNotif<T>(selector: string[], getMessage: (elt: T) => string): Subscription {
        return this.addStoreChangeNotif(selector, getMessage, NotificationType.WARNING, NotificationIcon.WARNING);
    }

    public addStoreChangeErrorNotif<T>(selector: string[], getMessage: (elt: T) => string): Subscription {
        return this.addStoreChangeNotif(selector, getMessage, NotificationType.ERROR, NotificationIcon.ERROR);
    }

}

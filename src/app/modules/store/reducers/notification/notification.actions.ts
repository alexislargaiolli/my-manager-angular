import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { Project, Client } from 'app/models';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store.types';
import { ModelActions } from '../model/model.actions';
import { ProjectState } from 'app/models';
import { MyNotification } from '../../../core/models/my-notification.model';

@Injectable()
export class NotificationActions {

    public static readonly ADD_NOTIFICATION = 'ADD_NOTIFICATION';
    public static readonly REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

    constructor(protected _ngRedux: NgRedux<IAppState>) { }

    public addNotification(notification: MyNotification) {
        return {
            type: NotificationActions.ADD_NOTIFICATION,
            payload: notification
        }
    }

    public dispatchAddNotification(notification: MyNotification) {
        return this._ngRedux.dispatch(this.addNotification(notification));
    }

    public removeNotification(notification: MyNotification) {
        return {
            type: NotificationActions.REMOVE_NOTIFICATION,
            payload: notification
        }
    }

    public dispatchRemoveNotification(notification: MyNotification) {
        return this._ngRedux.dispatch(this.removeNotification(notification));
    }

}

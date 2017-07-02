import { IModelList } from '../../../core/models/generic.model';
import { RepositoriesService } from 'app/modules/core';
import { Action } from "redux";
import { IPayloadAction } from 'app/modules/core';
import { modelReducer } from '../model/model.reducer';
import { INotificationState } from '../../store.types';
import { NotificationActions } from './notification.actions';
import { ModelUtils } from '../../../core/models/model.utils';

const INITIAL_STATE: INotificationState = {
    items: []
};

export function notificationReducer(state: INotificationState = INITIAL_STATE, action) {
    switch (action.type) {
        case NotificationActions.ADD_NOTIFICATION:
            return Object.assign({}, state, { items: state.items.concat(action.payload) });
        case NotificationActions.REMOVE_NOTIFICATION:
            return Object.assign({}, state, { items: ModelUtils.immutableRemove(state.items, action.payload.id) });
    }
    return state;
}

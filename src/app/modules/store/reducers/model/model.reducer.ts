
import { IModelList, IPayloadAction, IModel, ModelUtils } from 'app/modules/core';
import { ModelActions } from './model.actions';
import { ActionUtils } from './action.utils';



export function modelReducer<T extends IModel>(modelName: string, actionSource: string, state: IModelList<T>, action: IPayloadAction<any, any>): any {
    switch (action.type) {
        case ActionUtils.asyncActionType(actionSource, ModelActions.LOAD, ActionUtils.REQUEST):
            return Object.assign({}, state, { loading: true, items: [], error: null });

        case ActionUtils.asyncActionType(actionSource, ModelActions.LOAD, ActionUtils.SUCCESS):
            return Object.assign({}, state, { items: action.payload, loading: false });

        case ActionUtils.asyncActionType(actionSource, ModelActions.LOAD, ActionUtils.ERROR):
            return Object.assign({}, state, { items: [], loading: false, error: action.payload });

        case ActionUtils.asyncActionType(actionSource, ModelActions.CREATE, ActionUtils.SUCCESS):
            return Object.assign({}, state, { items: state.items.concat(action.payload), loading: false, error: null });

        case ActionUtils.asyncActionType(actionSource, ModelActions.UPDATE, ActionUtils.SUCCESS):
            return Object.assign({}, state, { items: ModelUtils.immutableUpdate(state.items, action.payload), loading: false, error: null });

        case ActionUtils.asyncActionType(actionSource, ModelActions.PATCH, ActionUtils.SUCCESS):
            return Object.assign({}, state, { items: ModelUtils.immutableUpdate(state.items, action.payload), loading: false, error: null });

        case ActionUtils.asyncActionType(actionSource, ModelActions.DELETE, ActionUtils.SUCCESS):
            return Object.assign({}, state, { items: ModelUtils.immutableRemove(state.items, action.payload.id), loading: false, error: null });
    }
    return state;
}

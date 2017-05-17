
import { IModelList, IPayloadAction, IModel } from 'app/modules/core';
import { ModelActions } from './model.actions';
import { ActionUtils } from './action.utils';



export function modelReducer<T extends IModel>(modelName: string, state: IModelList<T>, action: IPayloadAction<any, any>) {
    switch (action.type) {
        case ActionUtils.asyncActionType(modelName, ModelActions.LOAD, ActionUtils.REQUEST):
            return {
                items: [],
                loading: true,
                error: null
            }
        case ActionUtils.asyncActionType(modelName, ModelActions.LOAD, ActionUtils.SUCCESS):
            return {
                items: action.payload,
                loading: true,
                error: null
            }
        case ActionUtils.asyncActionType(modelName, ModelActions.LOAD, ActionUtils.ERROR):
            return {
                items: [],
                loading: false,
                error: action.error
            };
        case ActionUtils.asyncActionType(modelName, ModelActions.CREATE, ActionUtils.SUCCESS):
            return {
                items: state.items.concat(action.payload),
                loading: false,
                error: null
            };
        case ActionUtils.asyncActionType(modelName, ModelActions.UPDATE, ActionUtils.SUCCESS):
            const i = state.items.findIndex(a => a.id === action.payload.id);
            return {
                items: [
                    ...state.items.slice(0, i),
                    action.payload,
                    ...state.items.slice(i + 1)
                ],
                loading: false,
                error: null
            };
        case ActionUtils.asyncActionType(modelName, ModelActions.DELETE, ActionUtils.SUCCESS):
            const index = state.items.findIndex(a => a.id === action.payload);
            return {
                items: state.items.filter(m => m.id !== action.payload),
                loading: false,
                error: null
            };
    }
    return state;
}


import { IModelList, IPayloadAction, IModel, ModelUtils } from 'app/modules/core';
import { ModelActions } from './model.actions';
import { ActionUtils } from './action.utils';



export function modelReducer<T extends IModel>(modelName: string, actionSource: string, state: IModelList<T>, action: IPayloadAction<any, any>): any {
    switch (action.type) {

        // -----------  LOAD  -------------- //

        case ActionUtils.asyncActionType(actionSource, ModelActions.LOAD, ActionUtils.REQUEST):

        // /!\ problème deux fois skip
            return Object.assign({}, state, { loading: true, items: [], error: null, skip: action.payload.skip, limit: action.payload.limit });

        case ActionUtils.asyncActionType(actionSource, ModelActions.LOAD, ActionUtils.SUCCESS):
            return Object.assign({}, state, { items: action.payload, loading: false });

        case ActionUtils.asyncActionType(actionSource, ModelActions.LOAD, ActionUtils.ERROR):
            return Object.assign({}, state, { items: [], loading: false, error: action.payload });




        // -----------  LOAD MORE  -------------- //

        case ActionUtils.asyncActionType(actionSource, ModelActions.LOAD_MORE, ActionUtils.REQUEST):
            return Object.assign({}, state, { loading: true, error: null, skip: action.payload.skip, limit: action.payload.limit });

        case ActionUtils.asyncActionType(actionSource, ModelActions.LOAD_MORE, ActionUtils.SUCCESS):
            return Object.assign({}, state, { loading: false, error: null, items: state.items.concat(action.payload) });

        case ActionUtils.asyncActionType(actionSource, ModelActions.LOAD_MORE, ActionUtils.ERROR):
            return Object.assign({}, state, { loading: false, error: action.payload });




        // -----------  CREATE  -------------- //

        case ActionUtils.asyncActionType(actionSource, ModelActions.CREATE, ActionUtils.REQUEST):
            return Object.assign({}, state, { creating: true });

        case ActionUtils.asyncActionType(actionSource, ModelActions.CREATE, ActionUtils.SUCCESS):
            return Object.assign({}, state, { items: state.items.concat(action.payload), error: null, creating: false, lastCreated: action.payload });





        // -----------  UPDATE  -------------- //

        case ActionUtils.asyncActionType(actionSource, ModelActions.UPDATE, ActionUtils.REQUEST):
            return Object.assign({}, state, { updating: true });

        case ActionUtils.asyncActionType(actionSource, ModelActions.UPDATE, ActionUtils.SUCCESS):
            return Object.assign({}, state, { items: ModelUtils.immutableUpdate(state.items, action.payload), error: null, updating: false, lastUpdated: action.payload });





        // -----------  PATCH  -------------- //

        case ActionUtils.asyncActionType(actionSource, ModelActions.PATCH, ActionUtils.REQUEST):
            return Object.assign({}, state, { updating: true });

        case ActionUtils.asyncActionType(actionSource, ModelActions.PATCH, ActionUtils.SUCCESS):
            return Object.assign({}, state, { items: ModelUtils.immutableUpdate(state.items, action.payload), error: null, updating: false, lastUpdated: action.payload });







        // -----------  DELETE  -------------- //

        case ActionUtils.asyncActionType(actionSource, ModelActions.DELETE, ActionUtils.REQUEST):
            const elt = Object.assign({}, action.payload.model, { removing: true });
            return Object.assign({}, state, { items: ModelUtils.immutableUpdate(state.items, elt), error: null, deleting: true });

        case ActionUtils.asyncActionType(actionSource, ModelActions.DELETE, ActionUtils.SUCCESS):
            return Object.assign({}, state, { items: ModelUtils.immutableRemove(state.items, action.payload.model.id), error: null, deleting: false, lastDeleted: action.payload.model });
    }
    return state;
}

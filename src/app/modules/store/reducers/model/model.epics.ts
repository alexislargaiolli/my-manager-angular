import { IModel, RepositoriesService } from 'app/modules/core';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { ModelActions } from './model.actions';
import { of } from 'rxjs/observable/of';
import { ActionUtils } from './action.utils';
import { Epic } from 'redux-observable-decorator'

export abstract class ModelEpics<T extends IModel> {

    constructor(
        protected _modelName: string,
        protected _repo: RepositoriesService,
        protected _modelAction: ModelActions<T>
    ) { }

    protected load = action$ => action$
        .ofType(ActionUtils.asyncActionType(this._modelName, ModelActions.LOAD, ActionUtils.REQUEST))
        .switchMap(() => this._repo.get(this._modelName, null).byCurrentUser().exec()
            .map(models => this._modelAction.loadSuccess(models))
            .catch(error => of(this._modelAction.loadError(error)))
        );

    protected create = action$ => action$
        .ofType(ActionUtils.asyncActionType(this._modelName, ModelActions.CREATE, ActionUtils.REQUEST))
        .switchMap(action => this._repo.create(this._modelName, action.payload).byCurrentUser().exec()
            .map(model => this._modelAction.createSuccess(model))
            .catch(error => of(this._modelAction.createError(error)))
        );

    protected update = action$ => action$
        .ofType(ActionUtils.asyncActionType(this._modelName, ModelActions.UPDATE, ActionUtils.REQUEST))
        .switchMap(action => this._repo.update(this._modelName, action.payload).byCurrentUser().exec()
            .map(model => this._modelAction.updateSuccess(model))
            .catch(error => of(this._modelAction.updateError(error)))
        );

    protected delete = action$ => action$
        .ofType(ActionUtils.asyncActionType(this._modelName, ModelActions.DELETE, ActionUtils.REQUEST))
        .mergeMap(action => this._repo.delete(this._modelName, action.payload).byCurrentUser().exec()
            .map(() => this._modelAction.deleteSuccess(action.payload))
            .catch(error => of(this._modelAction.deleteError(error)))
        );
}

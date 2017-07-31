import { IModel, RepositoriesService, IModelList } from 'app/modules/core';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { ModelActions } from './model.actions';
import { of } from 'rxjs/observable/of';
import { ActionUtils } from './action.utils';
import { Epic } from 'redux-observable-decorator';
import { RepositoryRequest } from '../../../core/services/repositories/repository-request';
import { Project } from 'app/models';
import { IAppState } from '../../store.types';

export abstract class ModelEpics<T extends IModel> {

    constructor(
        protected _modelName: string,
        protected _repo: RepositoriesService,
        protected _modelAction: ModelActions<T>
    ) { }

    /**
     * Define the action source to use in event name. Default is model name.
     */
    protected getActionSource(): string {
        return this._modelName;
    }

    public static createEpic<T extends IModel>(actionName, request: RepositoryRequest<T>, mapFunction, catchFunction) {
        return action$ => action$.ofType(actionName).switchMap((action) => request.exec().map(mapFunction).catch(catchFunction));
    }

    protected load = (action$) => action$
        .ofType(ActionUtils.asyncActionType(this.getActionSource(), ModelActions.LOAD, ActionUtils.REQUEST))
        .switchMap((action) => {
            const request = this._repo.get(this._modelName, null);
            action.payload && action.payload.projectId == null ? request.byCurrentUser() : request.by(Project.REPO_KEY, action.payload.projectId);
            if (action.payload.limit) {
                request.limit(action.payload.limit);
            }
            this.loadRequest(request);
            return request.exec()
                .map(models => this._modelAction.loadSuccess(models))
                .catch(error => of(this._modelAction.loadError(error)));
        })

    protected create = action$ => action$
        .ofType(ActionUtils.asyncActionType(this.getActionSource(), ModelActions.CREATE, ActionUtils.REQUEST))
        .switchMap(action => {
            const request = this._repo.create(this._modelName, action.payload.model);
            action.payload.projectId == null ? request.byCurrentUser() : request.by(Project.REPO_KEY, action.payload.projectId);
            this.createRequest(request);
            return request.exec()
                .map(model => this._modelAction.createSuccess(model))
                .catch(error => of(this._modelAction.createError(error)));
        })

    protected update = action$ => action$
        .ofType(ActionUtils.asyncActionType(this.getActionSource(), ModelActions.UPDATE, ActionUtils.REQUEST))
        .switchMap(action => {
            const request = this._repo.update(this._modelName, action.payload.model);
            action.payload.projectId == null ? request.byCurrentUser() : request.by(Project.REPO_KEY, action.payload.projectId);
            return request.exec()
                .map(model => this._modelAction.updateSuccess(model))
                .catch(error => of(this._modelAction.updateError(error)));
        })

    protected patch = action$ => action$
        .ofType(ActionUtils.asyncActionType(this.getActionSource(), ModelActions.PATCH, ActionUtils.REQUEST))
        .switchMap(action => {
            const request = this._repo.patch(this._modelName, action.payload.id, action.payload.attributes);
            return request.exec()
                .map(model => this._modelAction.patchSuccess(model))
                .catch(error => of(this._modelAction.patchError(error)));
        })

    protected delete = action$ => action$
        .ofType(ActionUtils.asyncActionType(this.getActionSource(), ModelActions.DELETE, ActionUtils.REQUEST))
        .switchMap(action => {
            const request = this._repo.delete(this._modelName, action.payload.model.id);
            action.payload.projectId == null ? request.byCurrentUser() : request.by(Project.REPO_KEY, action.payload.projectId);
            return request.exec()
                .map(() => this._modelAction.deleteSuccess(action.payload.model))
                .catch(error => of(this._modelAction.deleteError(error)));
        })

    protected loadMore = (action$) => action$
        .ofType(ActionUtils.asyncActionType(this.getActionSource(), ModelActions.LOAD_MORE, ActionUtils.REQUEST))
        .switchMap((action) => {
            const request = this._repo.get(this._modelName, null);
            action.payload && action.payload.projectId == null ? request.byCurrentUser() : request.by(Project.REPO_KEY, action.payload.projectId);
            if (action.payload.limit) {
                request.limit(action.payload.limit);
            }
            if (action.payload.skip) {
                request.skip(action.payload.skip);
            }
            this.loadRequest(request);
            return request.exec()
                .map(models => this._modelAction.loadMoreSuccess(models))
                .catch(error => of(this._modelAction.loadMoreError(error)));
        })

    /**
     * Call before load request execution. Allow to add filter / sort to request.
     * @param request
     */
    protected loadRequest(request: RepositoryRequest<IModel>) {

    }

    /**
     * Call before create request execution. Allow to add filter / sort to request.
     * @param request
     */
    protected createRequest(request: RepositoryRequest<IModel>) {

    }
}

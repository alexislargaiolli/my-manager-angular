import { IModel, RepositoriesService, RepositoryRequest } from 'app/modules/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store.types';
import { Observable } from 'rxjs/Observable';
import { ActionUtils } from './action.utils';

export abstract class ModelActions<T extends IModel> {
    public static readonly LOAD = 'LOAD';
    public static readonly LOAD_MORE = 'LOAD_MORE';
    public static readonly CREATE = 'CREATE';
    public static readonly UPDATE = 'UPDATE';
    public static readonly PATCH = 'PATCH';
    public static readonly DELETE = 'DELETE';

    constructor(protected _ngRedux: NgRedux<IAppState>, protected repo: RepositoriesService, protected modelName: string) { }

    /**
     * Define the action source to use in event name. Default is model name.
     */
    protected getActionSource(): string {
        return this.modelName;
    }

    protected createAction(actionName: string, actionState: string, payload: any) {
        return ActionUtils.createAction(this.getActionSource(), actionName, actionState, payload);
    }

    // Load

    load(projectId?: number, limit?: number) {
        return this.createAction(ModelActions.LOAD, ActionUtils.REQUEST, { projectId, limit });
    }

    loadSuccess(models) {
        return this.createAction(ModelActions.LOAD, ActionUtils.SUCCESS, models);
    }

    loadError(error) {
        return this.createAction(ModelActions.LOAD, ActionUtils.ERROR, error);
    }

    dispatchLoad(projectId?: number) {
        this._ngRedux.dispatch(this.load(projectId));
    }



    // Create

    create(model, projectId?: number) {
        return this.createAction(ModelActions.CREATE, ActionUtils.REQUEST, { model, projectId });
    }

    createSuccess(body) {
        return this.createAction(ModelActions.CREATE, ActionUtils.SUCCESS, body);
    }

    createError(error) {
        return this.createAction(ModelActions.CREATE, ActionUtils.ERROR, error);
    }

    dispatchCreate(model, projectId?: number) {
        this._ngRedux.dispatch(this.create(model, projectId));
    }


    // Update

    update(model: T, projectId?: number) {
        return this.createAction(ModelActions.UPDATE, ActionUtils.REQUEST, { model, projectId });
    }

    updateSuccess(model: T) {
        return this.createAction(ModelActions.UPDATE, ActionUtils.SUCCESS, model);
    }

    updateError(error) {
        return this.createAction(ModelActions.UPDATE, ActionUtils.ERROR, error);
    }

    dispatchUpdate(model: T, projectId?: number) {
        this._ngRedux.dispatch(this.update(model, projectId));
    }



    // Patch

    patch(id: number, attributes, projectId?: number) {
        return this.createAction(ModelActions.PATCH, ActionUtils.REQUEST, { id, attributes, projectId });
    }

    patchSuccess(model: T) {
        return this.createAction(ModelActions.PATCH, ActionUtils.SUCCESS, model);
    }

    patchError(error) {
        return this.createAction(ModelActions.PATCH, ActionUtils.ERROR, error);
    }

    dispatchPatch(id: number, attributes, projectId?: number) {
        this._ngRedux.dispatch(this.patch(id, attributes, projectId));
    }



    // Delete 

    delete(model: T, projectId?: number) {
        return this.createAction(ModelActions.DELETE, ActionUtils.REQUEST, { model, projectId });
    }

    deleteSuccess(model: T) {
        return this.createAction(ModelActions.DELETE, ActionUtils.SUCCESS, { model });
    }

    deleteError(error) {
        return this.createAction(ModelActions.DELETE, ActionUtils.ERROR, error);
    }

    dispatchDelete(model: T, projectId?: number) {
        this._ngRedux.dispatch(this.delete(model, projectId));
    }






    public loadMore(projectId?: number, limit?: number, skip?: number) {
        return this.createAction(ModelActions.LOAD_MORE, ActionUtils.REQUEST, { projectId, limit, skip });
    }

    public loadMoreSuccess(items: T[]) {
        return this.createAction(ModelActions.LOAD_MORE, ActionUtils.SUCCESS, items);
    }

    public loadMoreError(error) {
        return this.createAction(ModelActions.LOAD_MORE, ActionUtils.ERROR, error);
    }

    public dispatchLoadMore(projectId?: number, limit?: number, skip?: number) {
        return this._ngRedux.dispatch(this.loadMore(projectId, limit, skip));
    }







    save(body, projectId?: number) {
        if (body['id'])
            return this.update(body, projectId);
        return this.create(body, projectId);
    }

    dispatchSave(body, projectId?: number) {
        this._ngRedux.dispatch(this.save(body, projectId));
    }


}

import { IModel, RepositoriesService, RepositoryRequest } from 'app/modules/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store.types';
import { Observable } from 'rxjs/Observable';
import { ActionUtils } from './action.utils';

export abstract class ModelActions<T extends IModel> {
    public static readonly LOAD = 'LOAD';
    public static readonly CREATE = 'CREATE';
    public static readonly UPDATE = 'UPDATE';
    public static readonly DELETE = 'DELETE';

    constructor(protected _ngRedux: NgRedux<IAppState>, protected repo: RepositoriesService, protected modelName: string) { }


    // Load

    load(projectId?: number) {
        return ActionUtils.createAction(this.modelName, ModelActions.LOAD, ActionUtils.REQUEST, projectId);
    }

    loadSuccess(models) {
        return ActionUtils.createAction(this.modelName, ModelActions.LOAD, ActionUtils.SUCCESS, models);
    }

    loadError(error) {
        return ActionUtils.createAction(this.modelName, ModelActions.LOAD, ActionUtils.ERROR, error);
    }

    dispatchLoad(projectId?: number) {
        this._ngRedux.dispatch(this.load(projectId));
    }



    // Create

    create(model, projectId?: number) {
        return ActionUtils.createAction(this.modelName, ModelActions.CREATE, ActionUtils.REQUEST, { model, projectId });
    }

    createSuccess(body) {
        return ActionUtils.createAction(this.modelName, ModelActions.CREATE, ActionUtils.SUCCESS, body);
    }

    createError(error) {
        return ActionUtils.createAction(this.modelName, ModelActions.CREATE, ActionUtils.ERROR, error);
    }

    dispatchCreate(model, projectId?: number) {
        this._ngRedux.dispatch(this.create(model, projectId));
    }


    // Update

    update(model: T, projectId?: number) {
        return ActionUtils.createAction(this.modelName, ModelActions.UPDATE, ActionUtils.REQUEST, { model, projectId });
    }

    updateSuccess(model: T) {
        return ActionUtils.createAction(this.modelName, ModelActions.UPDATE, ActionUtils.SUCCESS, model);
    }

    updateError(error) {
        return ActionUtils.createAction(this.modelName, ModelActions.UPDATE, ActionUtils.ERROR, error);
    }

    dispatchUpdate(model: T, projectId?: number) {
        this._ngRedux.dispatch(this.update(model, projectId));
    }



    // Delete 

    delete(id: number, projectId?: number) {
        return ActionUtils.createAction(this.modelName, ModelActions.DELETE, ActionUtils.REQUEST, { id, projectId });
    }

    deleteSuccess(id) {
        return ActionUtils.createAction(this.modelName, ModelActions.DELETE, ActionUtils.SUCCESS, id);
    }

    deleteError(error) {
        return ActionUtils.createAction(this.modelName, ModelActions.DELETE, ActionUtils.ERROR, error);
    }

    dispatchDelete(id: number, projectId?: number) {
        this._ngRedux.dispatch(this.delete(id, projectId));
    }




    save(body) {
        if (body['id'])
            return this.update(body);
        this.create(body);
    }


}

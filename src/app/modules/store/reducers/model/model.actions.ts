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

    constructor(protected repo: RepositoriesService, protected modelName: string) { }

    load() {
        return ActionUtils.createAction(this.modelName, ModelActions.LOAD, ActionUtils.REQUEST, null);
    }

    loadSuccess(models) {
        return ActionUtils.createAction(this.modelName, ModelActions.LOAD, ActionUtils.SUCCESS, models);
    }

    loadError(error) {
        return ActionUtils.createAction(this.modelName, ModelActions.LOAD, ActionUtils.ERROR, error);
    }

    create(body) {
        return ActionUtils.createAction(this.modelName, ModelActions.CREATE, ActionUtils.REQUEST, body);
    }

    createSuccess(body) {
        return ActionUtils.createAction(this.modelName, ModelActions.CREATE, ActionUtils.SUCCESS, body);
    }

    createError(error) {
        return ActionUtils.createAction(this.modelName, ModelActions.CREATE, ActionUtils.ERROR, error);
    }

    update(model: T) {
        return ActionUtils.createAction(this.modelName, ModelActions.UPDATE, ActionUtils.REQUEST, model);
    }

    updateSuccess(model: T) {
        return ActionUtils.createAction(this.modelName, ModelActions.UPDATE, ActionUtils.SUCCESS, model);
    }

    updateError(error) {
        return ActionUtils.createAction(this.modelName, ModelActions.UPDATE, ActionUtils.ERROR, error);
    }

    delete(id) {
        return ActionUtils.createAction(this.modelName, ModelActions.DELETE, ActionUtils.REQUEST, id);
    }

    deleteSuccess(id) {
        return ActionUtils.createAction(this.modelName, ModelActions.DELETE, ActionUtils.SUCCESS, id);
    }

    deleteError(error) {
        return ActionUtils.createAction(this.modelName, ModelActions.DELETE, ActionUtils.ERROR, error);
    }

    save(body) {
        if (body['id'])
            return this.update(body);
        this.create(body);
    }


}

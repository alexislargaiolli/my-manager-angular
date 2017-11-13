import { List, Map } from 'immutable';

export interface IModel {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface IModelList<T extends IModel> {
    items: T[];
    loading: boolean;
    error: any;
    skip: number;
    limit: number;
    creating?: boolean;
    lastCreated?: T;
    updating?: boolean;
    lastUpdated?: T;
    deleting?: boolean;
    lastDeleted?: boolean;
}

/**
 * Immutable map of IModel identify by id
 */
export class IModelMap<T extends IModel>{
    _items: Map<number, IModel>;

    constructor(items: IModel[]) {
        let map = {};
        for (let model of items) {
            map[model.id] = model;
        }
        this._items = Map<number, IModel>(map);
    }
}

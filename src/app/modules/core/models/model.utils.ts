import { IModel } from 'app/modules/core';
import { List, Map } from 'immutable';

export class ModelUtils {
    public static addOrUpdate(collections: IModel[], elt: IModel) {
        const index = collections.findIndex(a => a.id === elt.id);
        if (index > 0) {
            collections[index] = elt;
        } else {
            collections.push(elt);
        }
    }

    public static remove(collections: IModel[], elt: IModel) {
        const index = collections.findIndex(a => a.id === elt.id);
        if (index >= 0) {
            collections.splice(index, 1);
        }
    }

    public static arrayToMap(items: IModel[]): { [id: number]: IModel } {
        let map = {};
        for (let model of items) {
            map[model.id] = model;
        }
        return map;
    }
}

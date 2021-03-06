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

    public static immutableRemove<T extends { id: number }>(items: T[], eltToRemoveId: number): T[] {
        const i = items.findIndex(a => {
            return a.id == eltToRemoveId;
        });
        if (i === -1) {
            return items;
        }
        return [...items.slice(0, i), ...items.slice(i + 1)];
    }

    public static immutableUpdate<T extends { id: number }>(items: T[], elt: T): T[] {
        const i = items.findIndex(a => a.id === elt.id);
        return [
            ...items.slice(0, i),
            elt,
            ...items.slice(i + 1)
        ]
    }

    public static immutableInsert<T extends { id: number }>(items: T[], elt: T, i: number): T[] {
        return [
            ...items.slice(0, i),
            elt,
            ...items.slice(i)
        ]
    }
}

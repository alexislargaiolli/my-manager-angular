import { IModel } from 'app/core/generics/models/generic.model';

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
}

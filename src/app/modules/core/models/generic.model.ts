export interface IModel {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface IModelList<T extends IModel> {
    items: T[];
    loading: boolean;
    error: any;
}

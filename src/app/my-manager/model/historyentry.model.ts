import { IModel } from 'app/core/generics/models/generic.model';

export class HistoryEntry implements IModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public title: string;
    public content:string;
    public date:Date;
    public project: number;
}
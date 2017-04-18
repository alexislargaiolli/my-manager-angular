import { IModel } from 'app/core/generics/models/generic.model';

export class Note implements IModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public title: string;
    public project: number;
    public priority: NotePriority;
    public done = false;
}

export enum NotePriority {
    NORMAL,
    IMPORTANT,
    URGENT
}

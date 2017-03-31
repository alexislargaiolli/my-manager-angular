import { IProjectModel } from './abstract-project.model';

export class Note implements IProjectModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public title: string;
    public project: number;
    public priority: NotePriority;
    public done: boolean = false;
}

export enum NotePriority {
    NORMAL,
    IMPORTANT,
    URGENT
}

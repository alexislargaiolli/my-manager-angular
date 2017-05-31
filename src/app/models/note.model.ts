import { IModel } from 'app/modules/core';

export class Note implements IModel {
    public static readonly REPO_KEY = 'Note';
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

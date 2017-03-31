import { IProjectModel } from './abstract-project.model';

export class Task implements IProjectModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public title: string;
    public description: string;
    public project: number;
    public state: TaskState = TaskState.TODO;
}

export enum TaskState {
    TODO,
    IN_PROGRESS,
    FINISHED,
    CANCELED
}

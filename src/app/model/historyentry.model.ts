import { IProjectModel } from './abstract-project.model';

export class HistoryEntry implements IProjectModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public title: string;
    public content:string;
    public date:Date;
    public project: number;
}

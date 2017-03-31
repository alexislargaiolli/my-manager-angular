import { IProjectModel } from './abstract-project.model';

export class Gain implements IProjectModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public title: string;
    public dueDate: Date;
    public project: number;
    public budget: number;
    public paidDate: Date;
    public devis:boolean;
    public invoiced:boolean;
    public paid:boolean;
}

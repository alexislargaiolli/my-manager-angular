import { IModel } from 'app/core/generics/models/generic.model';

export class Gain implements IModel {
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

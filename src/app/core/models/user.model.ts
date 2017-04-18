import { IModel } from 'app/core/generics/models/generic.model';

export class User implements IModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public firstname: string;
    public lastname: string;
    public email: string;
    public password: string;
}

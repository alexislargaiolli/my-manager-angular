import { IModel } from './generic.model';
import { Address } from 'app/models';

export class User implements IModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public firstname: string;
    public lastname: string;
    public username: String;
    public email: string;
    public password: string;
    public addresses: Address[];
}

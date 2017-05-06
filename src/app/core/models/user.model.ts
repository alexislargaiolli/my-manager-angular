import { IModel } from 'app/core/generics/models/generic.model';
import { Address } from 'app/my-manager/model/address.model';

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

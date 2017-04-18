import { IModel } from './abstract.model';
import { Address } from './address.model';

export class Client implements IModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public name: string;
    public firstname: string;
    public lastname: string;
    public email: string;
    public tel: number;
    public addresses: Address[];
}

import { IModel } from 'app/modules/core';

export class Address implements IModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public street: string;
    public city: string;
    public zipcode: string;
    public complement: string;
}

import { IModel } from 'app/core';

export class Address implements IModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public street: string;
    public city: string;
    public zipcode: number;
}

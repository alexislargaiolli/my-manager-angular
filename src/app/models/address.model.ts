import { IModel } from 'app/modules/core';

export class Address implements IModel {
    public static readonly REPO_KEY = 'Address';
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public street: string;
    public city: string;
    public zipcode: string;
    public complement: string;
}

import { IModel } from 'app/modules/core';
import { Address } from 'app/models';

export class Profile implements IModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public firstname: string;
    public lastname: string;
    public siret: string;
    public addresses: Address[];
}

import { IModel } from 'app/modules/core';
import { Address } from 'app/models';

export class Profile implements IModel {
    public static readonly REPO_KEY = 'Profile';
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public firstname: string;
    public lastname: string;
    public email: string;
    public phone: string;
    public siret: string;
    public tvaIntra: string;
    public addresses: Address[];
    constructor() {
        this.addresses = [];
    }

    public hasAddress(): boolean {
        return this.addresses.length !== 0;
    }

    public getDefaultAddress(): Address {
        if (this.addresses.length === 0) {
            return null;
        }
        return this.addresses[0];
    }
}

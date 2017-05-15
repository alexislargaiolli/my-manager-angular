import { IModel } from 'app/core';

export class Devis implements IModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public createDate: Date;
    public devisId: string;
    public title: string;
    public project: number;
    public budget: number;
    public paid: boolean;
    public paidDate: Date;
    public accepted: boolean;
    public acceptedDate: Date;
    public state: DevisState = DevisState.DRAFT;
}

export enum DevisState {
    DRAFT,
    PENDING,
    ACCEPTED,
    REFUSED,
    PAID
}

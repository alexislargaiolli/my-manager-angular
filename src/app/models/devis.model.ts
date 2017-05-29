import { IModel } from 'app/modules/core';

export class Devis implements IModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public createDate: Date;
    public validityDate: Date;
    public devisId: string;
    public title: string;
    public project: number;
    public budget: number;
    public paid: boolean;
    public paidDate: Date;
    public accepted: boolean;
    public acceptedDate: Date;
    public state: DevisState = DevisState.DRAFT;
    public clientStreet: string;
    public clientCity: string;
    public clientZipcode: string;
    public userStreet: string;
    public userCity: string;
    public userZipcode: string;
    public lines: DevisLine[];
}

export enum DevisState {
    DRAFT,
    PENDING,
    ACCEPTED,
    REFUSED,
    PAID
}

export class DevisLine {
    public content: string;
    public quantity: string;
    public unitPrice: number;
    public totalPrice: number;
}

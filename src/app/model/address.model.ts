import {IModel} from './abstract.model';

export class Address implements IModel {
    public id : number;
    public createdAt: Date;
    public updatedAt: Date;
    public streetNumber : string;
    public street : string;
    public city : string;
    public zipcode : number;
}

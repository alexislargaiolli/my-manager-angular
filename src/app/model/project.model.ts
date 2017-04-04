import { Client } from './client.model';
import { IModel } from './abstract.model';

export class Project implements IModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public name: string;
    public description: string;
    public plannedStartDate: Date;
    public startDate: Date;
    public plannedEndDate: Date;
    public endDate: Date;
    public budget: number;
    public progress: number = 0;
    public state: ProjectState = ProjectState.PROSPECTION;
    public clients:Client[];

    constructor() { }

    public isLate(): boolean {
        return false;
    }
}

export enum ProjectState {
    PROSPECTION,
    DEVIS,
    PRODUCTION,
    FACTURATION,
    FINISHED
}

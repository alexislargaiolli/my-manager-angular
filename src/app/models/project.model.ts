import { Note } from './note.model';
import { Client } from './client.model';
import { IModel } from 'app/modules/core';

export class Project implements IModel {
    public static readonly REPO_KEY = 'Project';
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
    public progress = 0;
    public state: ProjectState = ProjectState.PROSPECTION;
    public clients: Client[];
    public notes: Note[];

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

import { HistoryEntry } from './../model/historyentry.model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { GenericProjectModelService } from './generic.project-model-service';

@Injectable()
export class HistoryEntryService extends GenericProjectModelService<HistoryEntry> {

    constructor(protected http: Http) {
        super(http);
    }

    public getApiURL() : string{
        return this.BASE_URL + '/historyentry';
    }

}
import { AuthenticationService } from './authentication.service';
import { NotificationService } from './notification.service';
import { HistoryEntry } from './../model/historyentry.model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { GenericProjectModelService } from './generic.project-model-service';

@Injectable()
export class HistoryEntryService extends GenericProjectModelService<HistoryEntry> {

    constructor(
        protected http: Http,
        protected notificationService: NotificationService,
        protected authenticationService: AuthenticationService
    ) {
        super(http, notificationService, authenticationService);
    }

    public getApiURL() : string{
        return this.BASE_URL + '/historyentry';
    }

}
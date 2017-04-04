import { Client } from './../model/client.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { GenericService } from './generic.service';

@Injectable()
export class ClientService extends GenericService<Client> {

    constructor(protected http: Http) {
        super(http);
    }

    public getApiURL(): string {
        return this.BASE_URL + '/client';
    }

}

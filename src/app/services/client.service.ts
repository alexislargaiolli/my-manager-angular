import { Client } from '../model/client.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GenericService } from './generic.service';

@Injectable()
export class ClientService extends GenericService<Client> {

    constructor(protected http: Http) {
        super(http);
    }

    public getApiURL(): string {
        return this.BASE_URL + '/api/client';
    }

}

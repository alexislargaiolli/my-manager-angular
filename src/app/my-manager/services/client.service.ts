import { Client } from 'app/models';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ErrorService, EventsService, CurrentSession } from 'app/modules/core';
import { GenericProjectModelService } from 'app/my-manager/services/generic.project-model-service';
import { Address } from 'app/models';

@Injectable()
export class ClientService extends GenericProjectModelService<Client> {

    private ADDRESSES_URL = 'addresses';

    constructor(
        protected http: Http,
        protected errorService: ErrorService,
        protected currentSession: CurrentSession,
        protected eventsService: EventsService
    ) {
        super(http, errorService, currentSession, eventsService);
    }

    protected getModelName(): string {
        return 'clients';
    }

    public getAddresses(client: Client) {
        const url = `${this.getBaseApiURL()}/${client.id}/${this.ADDRESSES_URL}`;
        return this.handleResponse(this.http.get(url, this.generateOptions()));
    }

    public createAddress(client: Client, address: Address) {
        const url = `${this.getBaseApiURL()}/${client.id}/${this.ADDRESSES_URL}`;
        return this.handleResponse(this.http.post(url, address, this.generateOptions()));
    }

    public updateAddress(client: Client, address: Address) {
        const url = `${this.getBaseApiURL()}/${client.id}/${this.ADDRESSES_URL}/${address.id}`;
        return this.handleResponse(this.http.put(url, address, this.generateOptions()));
    }

    public saveAddress(client: Client, address: Address) {
        if (address.id == null) {
            return this.createAddress(client, address);
        }
        return this.updateAddress(client, address);
    }

    public deleteAddress(client: Client, address: Address) {
        const url = `${this.getBaseApiURL()}/${client.id}/${this.ADDRESSES_URL}/${address.id}`;
        return this.handleResponse(this.http.delete(url, this.generateOptions()));
    }

}

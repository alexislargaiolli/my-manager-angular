import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { GenericService } from 'app/core/generics/services/generic.service';
import { User } from 'app/core/models/user.model';
import { ErrorService } from './error.service';
import { EventsService } from './event.service';
import { CurrentSession } from './session.service';
import { BasicService } from 'app/core/generics/services/base.service';
import { Observable } from 'rxjs/Observable';
import { UserSession } from 'app/core/models/user-session.model';
import { Address } from "app/my-manager/model/address.model";

@Injectable()
export class UserService extends BasicService<User> {

    private ADDRESSES_URL = 'addresses';
    public authenticationToken: string;

    constructor(
        protected http: Http,
        protected errorService: ErrorService,
        protected eventsService: EventsService
    ) {
        super(http, errorService, eventsService);
    }

    protected generateOptions(): RequestOptions {
        return new RequestOptions({ headers: this.generateHeaders() });
    }

    protected getModelName(): string {
        return 'mmusers';
    }

    protected generateHeaders(): Headers {
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.authenticationToken
        });
    }

    public me(userSession: UserSession): Observable<User> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': userSession.token
        });
        const options = new RequestOptions({ headers: headers });
        return this.handleResponse(this.http.get(`${this.getApiURL()}/${userSession.userId}`, options));
    }

    public getAddresses(userId: number) {
        const url = `${this.getBaseApiURL()}/${userId}/${this.ADDRESSES_URL}`;
        return this.handleResponse(this.http.get(url, this.generateOptions()));
    }

    public createAddress(userId: number, address: Address) {
        const url = `${this.getBaseApiURL()}/${userId}/${this.ADDRESSES_URL}`;
        return this.handleResponse(this.http.post(url, address, this.generateOptions()));
    }

    public updateAddress(userId: number, address: Address) {
        const url = `${this.getBaseApiURL()}/${userId}/${this.ADDRESSES_URL}/${address.id}`;
        return this.handleResponse(this.http.put(url, address, this.generateOptions()));
    }

    public saveAddress(userId: number, address: Address) {
        if (address.id == null) {
            return this.createAddress(userId, address);
        }
        return this.updateAddress(userId, address);
    }

    public deleteAddress(userId: number, address: Address) {
        const url = `${this.getBaseApiURL()}/${userId}/${this.ADDRESSES_URL}/${address.id}`;
        return this.handleResponse(this.http.delete(url, this.generateOptions()));
    }
}

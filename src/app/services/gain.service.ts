import { Observable } from 'rxjs/Observable';
import { Gain } from '../model/gain.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GenericProjectModelService } from './generic.project-model-service';

@Injectable()
export class GainService extends GenericProjectModelService<Gain> {

    constructor(protected http: Http) {
        super(http);
    }

    protected getApiURL(): string {
        return this.BASE_URL + '/gain';
    }
}

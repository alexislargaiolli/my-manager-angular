import { Injectable, Optional } from '@angular/core';
import { RequestMethod, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from 'app/app-settings';
import { BackendConfig } from 'app/core/models/backend.config';
import { ErrorService } from 'app/core/services/error.service';

@Injectable()
export class BaseHttpService {
    protected debug = false;
    protected _config: BackendConfig;

    constructor( @Optional() config: BackendConfig, protected http: Http, protected errorService: ErrorService) {
        this._config = config;
        if (!this._config) {
            this._config = new BackendConfig();
            this._config.baseUrl = 'http://localhost:8080/api';
            this._config.loginEndpoint = '/login';
            this._config.logoutEndpoint = '/logout';
            console.warn(`No configuration provided for BaseHttpService.`);
            console.warn(`${this.config.baseUrl} will be use as default base url.`);
            console.warn(`${this.config.loginEndpoint} will be use as default login endpoint.`);
            console.warn(`${this.config.logoutEndpoint} will be use as default logout endpoint.`);
            console.warn(`To provide backend configuration inject CoreModule with CoreModule.forRoot({<backend_config>})`);
        }
    }

    public handleResponse(response: Observable<Response>) {
        return response.map((res: Response) => {
            const data = res.json();
            this.trace(data);
            return data;
        })
            .catch(err => this.handleError(err));
    }

    public handleError(error: Response) {
        return this.errorService.handleNetworkError(this.constructor.name, error.status, error.statusText, error.json());
    }

    public activeDebug() {
        this.debug = true;
    }

    public traceBefore(body: Object) {
        if (this.debug) {
            console.log('Before>');
            if (body instanceof Array) {
                console.table(body);
            } else {
                console.log(body);
            }
        }
    }

    protected trace(body: Object) {
        if (this.debug) {
            console.log('Result>');
            if (body instanceof Array) {
                console.table(body);
            } else {
                console.log(body);
            }
        }
    }

    get config(): BackendConfig {
        return this._config;
    }
}
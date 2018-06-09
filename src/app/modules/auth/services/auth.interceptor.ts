import { NgRedux } from '@angular-redux/store';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { IAppState } from 'app/modules/store';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _redux: NgRedux<IAppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth header from the service.
        const authToken = this._redux.getState().session.token;
        if (!authToken) {
            return next.handle(req);
        }
        // Clone the request to add the new header.
        req = req.clone({
            setHeaders: {
                Authorization: authToken
            }
        });
        // Pass on the cloned request instead of the original request.
        return next.handle(req).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    // this._redux.dispatch(new LogoutRequest());
                }
            }
        });
    }
}

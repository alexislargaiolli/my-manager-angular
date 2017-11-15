import { Injectable } from '@angular/core';

@Injectable()
export class RouterActions {

    public static readonly NAVIGATION_STARTS = 'NAVIGATION_STARTS';

    public navigationStarts(url: String) {
        return {
            type: RouterActions.NAVIGATION_STARTS,
            payload: url
        };
    }
}

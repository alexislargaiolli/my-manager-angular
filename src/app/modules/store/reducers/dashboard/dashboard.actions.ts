import { Injectable } from '@angular/core';

@Injectable()
export class DashboardActions {
    public static readonly LOAD_TOTAL_REQUEST = 'LOAD_TOTAL_REQUEST';
    public static readonly LOAD_TOTAL_SUCCESS = 'LOAD_TOTAL_SUCCESS';
    public static readonly LOAD_TOTAL_ERROR = 'LOAD_TOTAL_ERROR';

    constructor() { }

    loadTotal() {
        return {
            type: DashboardActions.LOAD_TOTAL_REQUEST,
        };
    }

    loadTotalSuccess(data) {
        return {
            type: DashboardActions.LOAD_TOTAL_SUCCESS,
            payload: data
        };
    }

    loadTotalError(error) {
        return {
            type: DashboardActions.LOAD_TOTAL_ERROR,
            payload: error
        };
    }

}

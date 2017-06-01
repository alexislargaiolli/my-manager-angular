import { Injectable } from '@angular/core';

@Injectable()
export class DashboardActions {

    constructor() { }

    public static readonly LOAD_TOTAL_REQUEST = 'LOAD_TOTAL_REQUEST';
    loadTotal() {
        return {
            type: DashboardActions.LOAD_TOTAL_REQUEST,
        };
    }

    public static readonly LOAD_TOTAL_SUCCESS = 'LOAD_TOTAL_SUCCESS';
    loadTotalSuccess(data) {
        return {
            type: DashboardActions.LOAD_TOTAL_SUCCESS,
            payload: data
        };
    }

    public static readonly LOAD_TOTAL_ERROR = 'LOAD_TOTAL_ERROR';
    loadTotalError(error) {
        return {
            type: DashboardActions.LOAD_TOTAL_ERROR,
            payload: error
        };
    }

}

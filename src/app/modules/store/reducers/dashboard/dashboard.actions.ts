import { Injectable } from '@angular/core';

@Injectable()
export class DashboardActions {
    public static readonly LOAD_TOTAL_REQUEST = 'LOAD_TOTAL_REQUEST';
    public static readonly LOAD_TOTAL_SUCCESS = 'LOAD_TOTAL_SUCCESS';
    public static readonly LOAD_TOTAL_ERROR = 'LOAD_TOTAL_ERROR';

    constructor() { }

    loadTotal(from: Date, to: Date) {
        return {
            type: DashboardActions.LOAD_TOTAL_REQUEST,
            payload: { from, to }
        };
    }

    loadTotalSuccess(data, from: Date, to: Date) {
        return {
            type: DashboardActions.LOAD_TOTAL_SUCCESS,
            payload: { data, from, to }
        };
    }

    loadTotalError(error) {
        return {
            type: DashboardActions.LOAD_TOTAL_ERROR,
            payload: error
        };
    }

}

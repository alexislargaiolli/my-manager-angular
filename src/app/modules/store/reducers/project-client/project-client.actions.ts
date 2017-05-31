import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { Client } from 'app/models';
import { IAppState } from 'app/modules/store';
import { ModelActions } from '../model/model.actions';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class ProjectClientActions extends ModelActions<Client> {

    public static readonly CLIENT_SOURCE = 'CLIENT_SOURCE';

    constructor(protected _ngRedux: NgRedux<IAppState>, protected _repo: RepositoriesService) {
        super(_ngRedux, _repo, Client.REPO_KEY)
    }

    /**
     * Define the action source to use in event name. Default is model name.
     */
    protected getActionSource(): string {
        return ProjectClientActions.CLIENT_SOURCE;
    }

    public static readonly ADD_TO_PROJECT = 'ADD_TO_PROJECT';
    addToProject(client: Client, projectId: number) {
        return {
            type: ProjectClientActions.ADD_TO_PROJECT,
            payload: {
                client,
                projectId
            }
        }
    }

    public dispatchAddToProject(client: Client, projectId: number) {
        this._ngRedux.dispatch(this.addToProject(client, projectId));
    }

    public static readonly REMOVE_FROM_PROJECT = 'REMOVE_FROM_PROJECT';
    removeFromProject(clientId: number, projectId: number) {
        return {
            type: ProjectClientActions.REMOVE_FROM_PROJECT,
            payload: {
                clientId,
                projectId
            }
        }
    }

    public dispatchRemoveFromProject(clientId: number, projectId: number) {
        this._ngRedux.dispatch(this.removeFromProject(clientId, projectId));
    }
}

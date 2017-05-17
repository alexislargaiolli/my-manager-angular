import { Injectable } from '@angular/core';
import { ProjectActions } from './project.actions';
import { RepositoriesService } from 'app/modules/core';
import { Project } from 'app/models';
import { of } from 'rxjs/observable/of';
import { createEpicMiddleware } from 'redux-observable';
import { ModelEpics } from '../model/model.epics';
import { Epic } from 'redux-observable-decorator';

@Injectable()
export class ProjectEpics extends ModelEpics<Project>{

    constructor(
        protected _repo: RepositoriesService,
        protected _projectActions: ProjectActions,
    ) {
        super(Project.name, _repo, _projectActions);
    }

    @Epic()
    loadProject = this.load;

    @Epic()
    createProject = this.create;

    @Epic()
    updateProject = this.update;

    @Epic()
    deleteProject = this.delete;

}

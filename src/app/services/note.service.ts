import { GenericProjectModelService } from './generic.project-model-service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Note } from '../model/note.model';

@Injectable()
export class NoteService extends GenericProjectModelService<Note> {

    constructor(protected http: Http) {
        super(http);
    }

    protected getApiURL(): string {
        return this.BASE_URL + '/note';
    }

}

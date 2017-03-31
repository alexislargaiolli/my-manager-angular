import { Observable } from 'rxjs/Observable';
import { log } from 'util';
import { IProjectModel } from '../../model/abstract-project.model';
import { IModel } from '../../model/abstract.model';
import { NgForm } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Gain } from '../../model/gain.model';
import { GainService } from '../../services/gain.service';
import { Component, OnInit } from '@angular/core';
import { GenericProjectModelService } from '../../services/generic.project-model-service';

export abstract class GenericProjectListComponent<T extends IProjectModel> implements OnInit {

    public elements: T[];
    public projectId: number;
    public selected: T;
    /**
     * True to load all element and ignore projectId parameter
     */
    protected loadAll: boolean = false;

    constructor(protected service: GenericProjectModelService<T>, protected route: ActivatedRoute) { }

    public ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.projectId = params['projectId'];
            this.loadElements();
        });
    }

    public create(form: NgForm) {
        let newElt: T = form.value;
        newElt.project = this.projectId;
        this.service.create(newElt).subscribe(elt => {
            this.elements.push(elt);
            form.reset();
        });
    }

    public delete(eltToDelete: T) {
        this.service.delete(eltToDelete).subscribe(res => {
            this.elements.splice(this.elements.findIndex((elt) => elt.id === eltToDelete.id), 1);
            this.unselect();
        });
    }

    public updateSelected() {
        this.service.update(this.selected).subscribe(elt => {
            this.unselect();
        });
    }

    public select(elt: T) {
        if (this.selected === elt) {
            this.unselect();
            return;
        }
        this.selected = elt;
    }

    public unselect() {
        this.selected = null;
    }

    protected loadElements() {
        let elements$: Observable<T[]>;
        if (this.loadAll) {
            elements$ = this.service.getAll();
        } else if (this.projectId) {
            elements$ = this.service.getByProject(this.projectId);
        } else {
            elements$ = this.service.getGenerals();
        }
        elements$.subscribe(elements => {
            this.elements = elements;
            this.onElementLoaded();
        });
    }

    protected onElementLoaded() {

    }
}

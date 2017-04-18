import { Observable } from 'rxjs/Observable';
import { log } from 'util';
import { NgForm } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Gain } from '../../model/gain.model';
import { GainService } from '../../services/gain.service';
import { Component, OnInit, Input } from '@angular/core';
import { GenericProjectModelService } from '../../services/generic.project-model-service';
import { IModel } from 'app/core/generics/models/generic.model';

export abstract class GenericProjectListComponent<T extends IModel> implements OnInit {

    @Input()
    public projectId: number;
    public elements: T[];
    public selected: T;

    constructor(protected service: GenericProjectModelService<T>) { }

    public ngOnInit() {
        this.loadElements();
    }

    public create(form: NgForm) {
        this.service.createByProject(this.projectId, form.value).subscribe(elt => {
            this.elements.push(elt);
            form.reset();
            this.onElementCreated(elt);
        });
    }

    public delete(eltToDelete: T) {
        this.service.deleteByProject(this.projectId, eltToDelete.id).subscribe(res => {
            this.elements.splice(this.elements.findIndex((elt) => elt.id === eltToDelete.id), 1);
            this.onElementDeleted(eltToDelete);
            this.unselect();
        });
    }

    public deleteSelected() {
        this.delete(this.selected);
    }

    public update(element: T) {
        this.service.updateByProject(this.projectId, element).subscribe(elt => {
            this.onElementUpdated(this.selected);
            this.unselect();
        });
    }

    public updateSelected() {
        if (this.selected) {
            this.update(this.selected);
        }
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
        if (this.projectId) {
            elements$ = this.service.getByProject(this.projectId);
        } else {
            elements$ = this.service.getAll();
        }
        elements$.subscribe(elements => {
            this.elements = elements;
            this.onElementLoaded();
        });
    }

    protected onElementLoaded() {

    }

    protected onElementCreated(elt: T) {

    }

    protected onElementUpdated(elt: T) {

    }

    protected onElementDeleted(elt: T) {

    }
}

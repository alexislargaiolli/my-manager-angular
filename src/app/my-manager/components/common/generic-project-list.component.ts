import { Observable } from 'rxjs/Observable';
import { log } from 'util';
import { NgForm } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { IModel } from 'app/core/generics/models/generic.model';
import { GenericProjectModelService } from 'app/my-manager/services/generic.project-model-service';

export abstract class GenericProjectListComponent<T extends IModel> implements OnInit {

    @Input()
    public projectId: number;
    public elements: T[] = [];
    public selected: T;

    constructor(protected service: GenericProjectModelService<T>) { }

    public ngOnInit() {
        this.loadElements();
    }

    public create(form: NgForm) {
        if (this.projectId != null) {
            this.service.createByProject(this.projectId, form.value).subscribe(elt => {
                this.elements.push(elt);
                form.reset();
                this.onElementCreated(elt);
            });
        } else {
            this.service.create(form.value).subscribe(elt => {
                this.elements.push(elt);
                form.reset();
                this.onElementCreated(elt);
            });
        }
    }

    public delete(eltToDelete: T) {
        if (this.projectId != null) {
            this.service.deleteByProject(this.projectId, eltToDelete.id).subscribe(res => {
                this.elements.splice(this.elements.findIndex((elt) => elt.id === eltToDelete.id), 1);
                this.onElementDeleted(eltToDelete);
                this.unselect();
            });
        } else {
            this.service.delete(eltToDelete).subscribe(res => {
                this.elements.splice(this.elements.findIndex((elt) => elt.id === eltToDelete.id), 1);
                this.onElementDeleted(eltToDelete);
                this.unselect();
            });
        }
    }

    public deleteSelected() {
        this.delete(this.selected);
    }

    public update(element: T) {
        if (this.projectId != null) {
            this.service.updateByProject(this.projectId, element).subscribe(elt => {
                this.onElementUpdated(this.selected);
                this.unselect();
            });
        } else {
            this.service.update(element).subscribe(elt => {
                this.onElementUpdated(this.selected);
                this.unselect();
            });
        }
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

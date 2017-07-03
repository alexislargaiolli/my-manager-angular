import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from 'app/models';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { ProjectTaskActions } from '../../../../store/reducers/project-task/project-task.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState, ProjectNoteActions } from 'app/modules/store';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project-note-list',
  templateUrl: './project-note-list.component.html',
  styleUrls: ['./project-note-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectNoteListComponent implements OnInit {

  @Input('notes')
  notes$: Observable<Note[]>;

  @Input('loading')
  loading$: Observable<boolean>;

  @Output()
  create: EventEmitter<Note> = new EventEmitter<Note>();

  @Output()
  toggle: EventEmitter<Note> = new EventEmitter<Note>();

  constructor(private _dragulaService: DragulaService, private _projectNoteActions: ProjectNoteActions, private _redux: NgRedux<IAppState>) {
    _dragulaService.setOptions('project-notes', {
      removeOnSpill: true
    });
    // _dragulaService.remove.subscribe((value) => {
    //   const noteId = +value[1].getAttribute('note-id');
    //   const projectId = this._redux.getState().selectedProject.id;
    //   this._projectNoteActions.dispatchDelete(noteId, projectId);
    // });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._dragulaService.destroy('project-notes');
  }

  submitCreate(form: NgForm) {
    if (form.valid) {
      this.create.emit(form.value);
      form.reset();
    }
  }

}

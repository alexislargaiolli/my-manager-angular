import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from 'app/models';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { ProjectTaskActions } from '../../../../store/reducers/project-task/project-task.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState, ProjectNoteActions } from 'app/modules/store';
import { NgForm } from '@angular/forms';
import { trigger, transition, query, style, animate, animateChild, state } from '@angular/animations';

@Component({
  selector: 'app-project-note-list',
  templateUrl: './project-note-list.component.html',
  styleUrls: ['./project-note-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnim', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: '0' }),
        animate('300ms ease-out', style({ transform: 'translateX(0%)', opacity: '1' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)', opacity: '1', overflow: 'hidden' }),
        animate('150ms ease-in', style({ transform: 'translateX(-100%)', opacity: '0' }))
      ])
    ]),
    trigger('formAnim', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', position: 'absolute', width: '*', opacity: '0' }),
        animate('300ms ease-out', style({ transform: 'translateX(0%)', opacity: '1' }))
      ]),
      transition(':leave', [
        style({ position: 'absolute', width: '*', transform: 'translateX(0%)', opacity: '1' }),
        animate('150ms ease-in', style({ transform: 'translateX(100%)', opacity: '0' }))
      ])
    ])
  ]
})
export class ProjectNoteListComponent implements OnInit {

  @Input()
  notes: Note[];

  @Input()
  loading: boolean;

  @Output()
  create: EventEmitter<Note> = new EventEmitter<Note>();

  @Output()
  delete: EventEmitter<Note> = new EventEmitter<Note>();

  creationMode = false;

  constructor() { }

  ngOnInit() {
  }

  public toggleCreationMode() {
    this.creationMode = !this.creationMode;
  }

}

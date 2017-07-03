import { NgForm } from '@angular/forms';
import { IMyOptions } from 'mydatepicker';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { HistoryEntry } from 'app/models';
import { trigger, state, style, transition, animate } from "@angular/animations";
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

@Component({
  selector: 'project-history',
  templateUrl: './project-history.component.html',
  styleUrls: ['./project-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('itemState', [
      state('*', style({
        transform: 'scale(1)',
      })),
      transition(':enter', [
        style({
          transform: 'scale(0)'
        }),
        animate('250ms ease-out')

      ]),
      transition(':leave', [
        animate('250ms ease-in',
          style({
            transform: 'scale(0)',
          }))
      ])
    ])
  ]
})
export class ProjectHistoryComponent implements OnInit {


  @Input('historyEntries')
  historyEntries$: Observable<HistoryEntry>;

  @Input('loading')
  loading$: Observable<boolean>;

  @Output()
  create: EventEmitter<HistoryEntry> = new EventEmitter<HistoryEntry>();

  @Output()
  loadMore: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  public createEntry(entry) {
    this.create.emit(entry);
  }

  public loadMoreEntry() {
    this.loadMore.emit();
  }

  protected onElementLoaded() {
    this.sortByDate();
  }

  public sortByDate() {
    // this.elements.sort((a, b) => {
    //   let dateA = new Date(a.date);
    //   let dateB = new Date(b.date);
    //   if (dateA > dateB) {
    //     return -1;
    //   } else if (dateA < dateB) {
    //     return 1;
    //   } else {
    //     return 0;
    //   }
    // });
  }

  public select(elt: HistoryEntry) {
    // if (!this.selected) {
    //   this.selected = Object.assign({}, elt);
    //   if (elt.date) {
    //     this.selected.date = new Date(elt.date);
    //   }
    // }
  }

  public itemState(elt: HistoryEntry) {
    // return this.selected && this.selected === elt ? 'active' : 'inactive';
  }

  protected onElementCreated(elt: HistoryEntry) {
    this.sortByDate();
  }

  protected onElementUpdated(elt: HistoryEntry) {
    this.sortByDate();
  }
}

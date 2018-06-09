import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistoryEntry } from 'app/models';

@Component({
  selector: 'project-history',
  templateUrl: './project-history.component.html',
  styleUrls: ['./project-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectHistoryComponent implements OnInit {

  @Input()
  historyEntries: HistoryEntry[];

  @Input()
  loading: boolean;

  @Output()
  create: EventEmitter<HistoryEntry> = new EventEmitter<HistoryEntry>();

  @Output()
  edit: EventEmitter<HistoryEntry> = new EventEmitter<HistoryEntry>();

  @Output()
  loadMore: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _changeDetector: ChangeDetectorRef) { }

  ngOnInit() { }

  public createEntry(entry) {
    this.create.emit(entry);
  }

  public loadMoreEntry() {
    this.loadMore.emit();
  }

  public editEntry(entry: HistoryEntry) {
    this.edit.emit(entry);
  }

}

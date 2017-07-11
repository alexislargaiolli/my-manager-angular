import { NgForm } from '@angular/forms';
import { IMyOptions } from 'mydatepicker';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy, OnChanges, SimpleChanges, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HistoryEntry } from 'app/models';
import { trigger, state, style, transition, animate } from "@angular/animations";
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

@Component({
  selector: 'project-history',
  templateUrl: './project-history.component.html',
  styleUrls: ['./project-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectHistoryComponent implements OnInit {

  @ViewChild('historyWrapper')
  historyWrapper: ElementRef;

  @Input()
  historyEntries: HistoryEntry[];

  @Input()
  loading: boolean;

  @Output()
  create: EventEmitter<HistoryEntry> = new EventEmitter<HistoryEntry>();

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

  public scrollRight() {
    this.scroll(1000, 0, 300, 0);
  }

  public scrollLeft() {
    this.scroll(1000, 0, -300, 0);
  }

  private scroll(duration, elapsedTime, deltaScroll, prevAdd) {
    if (elapsedTime > duration) {
      this._changeDetector.detectChanges();
      return;
    }
    const progression = elapsedTime / duration;
    const delta = (deltaScroll * progression) - prevAdd;
    this.historyWrapper.nativeElement.scrollLeft += delta;
    const deltaTime = 10;
    setTimeout(() => this.scroll(duration, elapsedTime + deltaTime, deltaScroll, delta), deltaTime);
  }

  public showScrollLeftBtn(): boolean {
    return this.historyWrapper.nativeElement.scrollLeft > 0;
  }

  public showScrollRightBtn(): boolean {
    const elt = this.historyWrapper.nativeElement;
    const maxScroll = elt.scrollWidth - elt.clientWidth;
    return elt.scrollLeft < maxScroll;
  }

}

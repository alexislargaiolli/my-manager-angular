import { NgForm } from '@angular/forms';
import { IMyOptions } from 'mydatepicker';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HistoryEntryService } from 'app/my-manager/services/history.service';
import { GenericProjectListComponent } from 'app/my-manager/components/common/generic-project-list.component';
import { HistoryEntry } from 'app/my-manager/model/historyentry.model';

@Component({
  selector: 'project-history',
  templateUrl: './project-history.component.html',
  styleUrls: ['./project-history.component.scss']
})
export class ProjectHistoryComponent extends GenericProjectListComponent<HistoryEntry> implements OnInit {

  constructor(protected historyService: HistoryEntryService) {
    super(historyService)
  }

  protected onElementLoaded() {
    this.sortByDate();
  }

  public sortByDate() {
    this.elements.sort((a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
      if (dateA > dateB) {
        return -1;
      } else if (dateA < dateB) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  public select(elt: HistoryEntry) {
    if (!this.selected) {
      this.selected = elt;
      if (elt.date) {
        this.selected.date = new Date(elt.date);
      }
    }
  }

  protected onElementCreated(elt: HistoryEntry) {
    this.sortByDate();
  }

  protected onElementUpdated(elt: HistoryEntry) {
    this.sortByDate();
  }
}
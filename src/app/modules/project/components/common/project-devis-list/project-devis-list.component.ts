import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Devis } from 'app/models';
import { listFadeAnim } from 'app/animations';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group
} from '@angular/animations';

@Component({
  selector: 'app-project-devis-list',
  templateUrl: './project-devis-list.component.html',
  styleUrls: ['./project-devis-list.component.scss'],
  animations: [listFadeAnim],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDevisListComponent implements OnInit {

  @Input()
  devisList: Devis[];

  @Input()
  loading: boolean;

  @Output()
  select: EventEmitter<Devis> = new EventEmitter<Devis>();

  constructor() { }

  ngOnInit() { }

  selectDevis(devis) {
    this.select.emit(devis);
  }
}

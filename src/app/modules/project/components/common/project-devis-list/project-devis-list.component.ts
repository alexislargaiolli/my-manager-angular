import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Devis } from 'app/models';

@Component({
  selector: 'app-project-devis-list',
  templateUrl: './project-devis-list.component.html',
  styleUrls: ['./project-devis-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDevisListComponent implements OnInit {

  @Input('devis')
  devis$: Observable<Devis[]>;

  @Input('loading')
  loading$: Observable<boolean>;

  @Output()
  select: EventEmitter<Devis> = new EventEmitter<Devis>();

  constructor() { }

  ngOnInit() {
  }

  selectDevis(devis) {
    this.select.emit(devis);
  }
}

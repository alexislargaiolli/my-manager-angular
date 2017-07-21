import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project-title',
  templateUrl: './project-title.component.html',
  styleUrls: ['./project-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectTitleComponent implements OnInit {

  @Input()
  title: string;

  @Output()
  back: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}

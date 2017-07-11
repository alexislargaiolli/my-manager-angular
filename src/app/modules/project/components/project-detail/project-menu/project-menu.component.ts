import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-project-menu',
  templateUrl: './project-menu.component.html',
  styleUrls: ['./project-menu.component.scss'],
  animations: [
    trigger('menuAnim', [
      state('projectDashboard', style({ transform: 'translateX(0)' })),
      state('projectTasks', style({ transform: 'translateX(203px)' })),
      state('projectDevis', style({ transform: 'translateX(406px)' })),
      state('projectInvoices', style({ transform: 'translateX(609px)' })),
      state('projectSettings', style({ transform: 'translateX(813px)' })),
      transition('*=>*', animate('200ms ease-in-out'))
    ])
  ]
})
export class ProjectMenuComponent implements OnInit {

  initialState: string;
  selected = false;
  state: String;

  constructor(private _route: ActivatedRoute) {
    this.state = this.initialState = this._route.snapshot.data.animation;
  }

  ngOnInit() {
  }

  public changeState(state) {
    if (!this.selected) {
      this.state = state;
    }
  }

  public selectState(state) {
    if (!this.selected) {
      this.state = state;
      this.selected = true;
    }
    return false;
  }

  public resetState() {
    if (!this.selected) {
      this.state = this.initialState;
    }
  }

}

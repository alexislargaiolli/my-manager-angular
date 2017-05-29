import { Component, OnInit } from '@angular/core';
import { ProfileActions, IAppState } from 'app/modules/store';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'app-profil',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private _profileActions: ProfileActions, private _redux: NgRedux<IAppState>) { }

  ngOnInit() {
    this._profileActions.dispatchLoad();
  }

}

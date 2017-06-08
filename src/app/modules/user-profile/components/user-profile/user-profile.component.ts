import { Component, OnInit } from '@angular/core';
import { ProfileActions, IAppState } from 'app/modules/store';
import { NgRedux } from '@angular-redux/store';
import { centerApparitionAnimation } from 'app/animations';

@Component({
  selector: 'app-profil',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: [centerApparitionAnimation]
})
export class UserProfileComponent implements OnInit {

  constructor(private _profileActions: ProfileActions, private _redux: NgRedux<IAppState>) { }

  ngOnInit() {

  }

}

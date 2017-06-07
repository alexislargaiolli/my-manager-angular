/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './login.component';
import { MaterialModule } from "@angular/material/material";
import { SharedModule } from 'app/modules/shared/shared.module';
import { StoreModule } from '../../../store/store.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from "app/modules/core/core.module";
import { AuthModule } from '../../auth.module';
import { SessionActions, SessionEpics, AuthenticationService } from 'app/modules/auth';
import { sessionReducer } from '../../redux/session/session.reducer';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, SharedModule, StoreModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [SessionActions, SessionEpics, AuthenticationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

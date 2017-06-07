/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InplaceDateComponent } from './inplace-date.component';

describe('InplaceDateComponent', () => {
  let component: InplaceDateComponent;
  let fixture: ComponentFixture<InplaceDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InplaceDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InplaceDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
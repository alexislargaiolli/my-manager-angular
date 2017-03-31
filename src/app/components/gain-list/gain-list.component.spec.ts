/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GainListComponent } from './gain-list.component';

describe('GainListComponent', () => {
  let component: GainListComponent;
  let fixture: ComponentFixture<GainListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GainListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
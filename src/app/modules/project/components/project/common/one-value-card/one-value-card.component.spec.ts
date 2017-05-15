/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OneValueCardComponent } from './one-value-card.component';

describe('OneValueCardComponent', () => {
  let component: OneValueCardComponent;
  let fixture: ComponentFixture<OneValueCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneValueCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneValueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
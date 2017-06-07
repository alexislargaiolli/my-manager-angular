/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SquareListItemComponent } from './square-list-item.component';

describe('SquareListItemComponent', () => {
  let component: SquareListItemComponent;
  let fixture: ComponentFixture<SquareListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SquareListItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

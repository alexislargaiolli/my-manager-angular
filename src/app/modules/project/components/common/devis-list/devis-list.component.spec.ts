/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DevisListComponent } from './devis-list.component';

describe('ProjectDevisListComponent', () => {
  let component: DevisListComponent;
  let fixture: ComponentFixture<DevisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DevisListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
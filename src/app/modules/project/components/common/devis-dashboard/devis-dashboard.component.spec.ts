/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DevisDashboardComponent } from './devis-dashboard.component';

describe('DevisPreviewComponent', () => {
  let component: DevisDashboardComponent;
  let fixture: ComponentFixture<DevisDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DevisDashboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevisDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

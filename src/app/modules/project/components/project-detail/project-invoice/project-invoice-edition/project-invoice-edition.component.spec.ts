/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProjectInvoiceEditionComponent } from './project-invoice-edition.component';

describe('ProjectDevisEditionComponent', () => {
  let component: ProjectInvoiceEditionComponent;
  let fixture: ComponentFixture<ProjectInvoiceEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectInvoiceEditionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInvoiceEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

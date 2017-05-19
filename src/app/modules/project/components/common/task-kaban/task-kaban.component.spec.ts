/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaskKabanComponent } from './task-kaban.component';

describe('TaskKabanComponent', () => {
  let component: TaskKabanComponent;
  let fixture: ComponentFixture<TaskKabanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskKabanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskKabanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
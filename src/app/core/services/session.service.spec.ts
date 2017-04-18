/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CurrentSession } from './session.service';

describe('Service: Session', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentSession]
    });
  });

  it('should ...', inject([CurrentSession], (service: CurrentSession) => {
    expect(service).toBeTruthy();
  }));
});
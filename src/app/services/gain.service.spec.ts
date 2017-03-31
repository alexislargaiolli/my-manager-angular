/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GainService } from './gain.service';

describe('Service: Gain', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GainService]
    });
  });

  it('should ...', inject([GainService], (service: GainService) => {
    expect(service).toBeTruthy();
  }));
});
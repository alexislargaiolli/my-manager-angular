/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DevisService } from './devis.service';

describe('Service: Devis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevisService]
    });
  });

  it('should ...', inject([DevisService], (service: DevisService) => {
    expect(service).toBeTruthy();
  }));
});
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RepositoriesService } from './repositories.service';
import { Model } from "app/core/generics/models/abstract.model";

describe('Service: Repositories', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepositoriesService]
    });
  });

  it('should ...', inject([RepositoriesService], (service: RepositoriesService) => {
    expect(service).toBeTruthy();
  }));

});
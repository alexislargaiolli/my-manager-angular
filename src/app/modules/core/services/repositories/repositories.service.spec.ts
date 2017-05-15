import { TestBed, async, inject } from '@angular/core/testing';
import { RepositoriesService } from './repositories.service';
import { IModel } from '../../models/generic.model';

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

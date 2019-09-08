import { TestBed } from '@angular/core/testing';

import { GetCuisinesService } from './get-cuisines.service';

describe('GetCuisinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetCuisinesService = TestBed.get(GetCuisinesService);
    expect(service).toBeTruthy();
  });
});

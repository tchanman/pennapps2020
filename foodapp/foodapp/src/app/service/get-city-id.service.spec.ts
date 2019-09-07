import { TestBed } from '@angular/core/testing';

import { GetCityIdService } from './get-city-id.service';

describe('GetCityIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetCityIdService = TestBed.get(GetCityIdService);
    expect(service).toBeTruthy();
  });
});

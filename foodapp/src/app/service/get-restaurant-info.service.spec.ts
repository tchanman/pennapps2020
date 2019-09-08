import { TestBed } from '@angular/core/testing';

import { GetRestaurantInfoService } from './get-restaurant-info.service';

describe('GetRestaurantInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetRestaurantInfoService = TestBed.get(GetRestaurantInfoService);
    expect(service).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetCurrentLocationService } from './getCurrentLocation.service';

describe('Service: GetCurrentLocation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCurrentLocationService]
    });
  });

  it('should ...', inject([GetCurrentLocationService], (service: GetCurrentLocationService) => {
    expect(service).toBeTruthy();
  }));
});

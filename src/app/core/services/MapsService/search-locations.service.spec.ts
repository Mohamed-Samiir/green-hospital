import { TestBed } from '@angular/core/testing';

import { SearchLocationsService } from './search-locations.service';

describe('SearchLocationsService', () => {
  let service: SearchLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchLocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

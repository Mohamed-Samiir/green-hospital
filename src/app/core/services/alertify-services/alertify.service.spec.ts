import { TestBed } from '@angular/core/testing';

import { AlertifyService } from './alertify.service';

describe('AlertifyServicesService', () => {
  let service: AlertifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

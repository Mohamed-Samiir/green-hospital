/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DoctorsService } from './doctors.service';

describe('Service: Doctors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorsService]
    });
  });

  it('should ...', inject([DoctorsService], (service: DoctorsService) => {
    expect(service).toBeTruthy();
  }));
});

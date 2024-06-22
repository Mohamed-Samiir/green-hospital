/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClinicDoctorService } from './clinic-doctor.service';

describe('Service: ClinicDoctor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClinicDoctorService]
    });
  });

  it('should ...', inject([ClinicDoctorService], (service: ClinicDoctorService) => {
    expect(service).toBeTruthy();
  }));
});

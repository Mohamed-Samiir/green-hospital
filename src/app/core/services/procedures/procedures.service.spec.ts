/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProceduresService } from './procedures.service';

describe('Service: Procedures', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProceduresService]
    });
  });

  it('should ...', inject([ProceduresService], (service: ProceduresService) => {
    expect(service).toBeTruthy();
  }));
});

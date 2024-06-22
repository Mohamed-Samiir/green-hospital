/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataGridDdlsService } from './data-grid-ddls.service';

describe('Service: DataGridDdls', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataGridDdlsService]
    });
  });

  it('should ...', inject([DataGridDdlsService], (service: DataGridDdlsService) => {
    expect(service).toBeTruthy();
  }));
});

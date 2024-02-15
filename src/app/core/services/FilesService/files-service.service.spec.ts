/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilesServiceService } from './files-service.service';

describe('Service: FilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesServiceService]
    });
  });

  it('should ...', inject([FilesServiceService], (service: FilesServiceService) => {
    expect(service).toBeTruthy();
  }));
});

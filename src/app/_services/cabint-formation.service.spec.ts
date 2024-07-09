import { TestBed } from '@angular/core/testing';

import { CabinetFormationService } from './cabinet-formation.service';

describe('CabintFormationService', () => {
  let service: CabinetFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CabinetFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

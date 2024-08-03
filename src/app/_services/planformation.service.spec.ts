import { TestBed } from '@angular/core/testing';

import { PlanformationService } from './planformation.service';

describe('PlanformationService', () => {
  let service: PlanformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

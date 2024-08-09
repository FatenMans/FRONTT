import { TestBed } from '@angular/core/testing';

import { EnrolledFormationService } from './enrolled-formation.service';

describe('EnrolledFormationService', () => {
  let service: EnrolledFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrolledFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

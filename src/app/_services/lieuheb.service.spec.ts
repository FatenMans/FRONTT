import { TestBed } from '@angular/core/testing';

import { LieuhebService } from './lieuheb.service';

describe('LieuhebService', () => {
  let service: LieuhebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LieuhebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CanActivateService } from './can-activate.guard';

describe('CanActivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanActivateService = TestBed.get(CanActivateService);
    expect(service).toBeTruthy();
  });
});

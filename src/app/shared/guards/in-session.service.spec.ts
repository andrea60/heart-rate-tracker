import { TestBed } from '@angular/core/testing';

import { InSessionService } from './in-session.service';

describe('InSessionService', () => {
  let service: InSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

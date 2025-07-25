import { TestBed } from '@angular/core/testing';

import { TimeFormattingServiceService } from './time-formatting-service.service';

describe('TimeFormattingServiceService', () => {
  let service: TimeFormattingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeFormattingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ProjectFormattingService } from './project-formatting.service';

describe('ProjectFormattingService', () => {
  let service: ProjectFormattingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectFormattingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ProjectDetailsServiceService } from './project-details-service.service';

describe('ProjectDetailsServiceService', () => {
  let service: ProjectDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

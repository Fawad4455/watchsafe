import { TestBed } from '@angular/core/testing';

import { CommonBrowserService } from './common-browser.service';

describe('CommonBrowserService', () => {
  let service: CommonBrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonBrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

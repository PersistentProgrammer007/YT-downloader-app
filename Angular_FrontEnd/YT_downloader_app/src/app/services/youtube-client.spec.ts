import { TestBed } from '@angular/core/testing';

import { YoutubeClient } from './youtube-client';

describe('YoutubeClient', () => {
  let service: YoutubeClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubeClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

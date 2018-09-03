import { TestBed, inject } from '@angular/core/testing';

import { KeyApiService } from './key-api.service';

describe('KeyApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyApiService]
    });
  });

  it('should be created', inject([KeyApiService], (service: KeyApiService) => {
    expect(service).toBeTruthy();
  }));
});

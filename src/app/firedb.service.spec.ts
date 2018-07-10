import { TestBed, inject } from '@angular/core/testing';

import { FiredbService } from './firedb.service';

describe('FiredbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiredbService]
    });
  });

  it('should be created', inject([FiredbService], (service: FiredbService) => {
    expect(service).toBeTruthy();
  }));
});

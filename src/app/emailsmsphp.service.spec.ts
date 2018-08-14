import { TestBed, inject } from '@angular/core/testing';

import { EmailsmsphpService } from './emailsmsphp.service';

describe('EmailsmsphpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailsmsphpService]
    });
  });

  it('should be created', inject([EmailsmsphpService], (service: EmailsmsphpService) => {
    expect(service).toBeTruthy();
  }));
});

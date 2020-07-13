import { TestBed } from '@angular/core/testing';

import { ErrorNominaService } from './error-nomina.service';

describe('ErrorNominaService', () => {
  let service: ErrorNominaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorNominaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

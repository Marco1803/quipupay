import { TestBed } from '@angular/core/testing';

import { AprobarNominaService } from './aprobar-nomina.service';

describe('AprobarNominaService', () => {
  let service: AprobarNominaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AprobarNominaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

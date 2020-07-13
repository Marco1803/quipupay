import { TestBed } from '@angular/core/testing';

import { DetalleNominaService } from './detalle-nomina.service';

describe('DetalleNominaService', () => {
  let service: DetalleNominaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleNominaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DatosService } from './datos.service';

describe('DatosServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatosService = TestBed.get(DatosService);
    expect(service).toBeTruthy();
  });
});

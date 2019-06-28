import { TestBed } from '@angular/core/testing';

import { ColresizeService } from './colresize.service';

describe('ColresizeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColresizeService = TestBed.get(ColresizeService);
    expect(service).toBeTruthy();
  });
});

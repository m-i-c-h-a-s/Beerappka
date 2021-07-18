import { TestBed } from '@angular/core/testing';

import { BeerStylesService } from './beer-styles.service';

describe('BeerStylesService', () => {
  let service: BeerStylesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeerStylesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonationCalculatorComponent } from './carbonation-calculator.component';

describe('CarbonationCalculatorComponent', () => {
  let component: CarbonationCalculatorComponent;
  let fixture: ComponentFixture<CarbonationCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonationCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarbonationCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

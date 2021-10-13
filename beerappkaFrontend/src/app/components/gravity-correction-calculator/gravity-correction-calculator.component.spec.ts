import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravityCorrectionCalculatorComponent } from './gravity-correction-calculator.component';

describe('GravityCorrectionCalculatorComponent', () => {
  let component: GravityCorrectionCalculatorComponent;
  let fixture: ComponentFixture<GravityCorrectionCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GravityCorrectionCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GravityCorrectionCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravityCalculatorComponent } from './gravity-calculator.component';

describe('GravityCalculatorComponent', () => {
  let component: GravityCalculatorComponent;
  let fixture: ComponentFixture<GravityCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GravityCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GravityCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

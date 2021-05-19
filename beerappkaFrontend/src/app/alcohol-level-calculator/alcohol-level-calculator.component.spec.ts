import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoholLevelCalculatorComponent } from './alcohol-level-calculator.component';

describe('AlcoholLevelCalculatorComponent', () => {
  let component: AlcoholLevelCalculatorComponent;
  let fixture: ComponentFixture<AlcoholLevelCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlcoholLevelCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcoholLevelCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchCreatorComponent } from './batch-creator.component';

describe('BatchCreatorComponent', () => {
  let component: BatchCreatorComponent;
  let fixture: ComponentFixture<BatchCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

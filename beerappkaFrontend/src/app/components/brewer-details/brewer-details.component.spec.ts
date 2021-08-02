import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewerDetailsComponent } from './brewer-details.component';

describe('BrewerDetailsComponent', () => {
  let component: BrewerDetailsComponent;
  let fixture: ComponentFixture<BrewerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrewerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

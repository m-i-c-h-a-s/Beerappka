import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewersListComponent } from './brewers-list.component';

describe('BrewersListComponent', () => {
  let component: BrewersListComponent;
  let fixture: ComponentFixture<BrewersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrewersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

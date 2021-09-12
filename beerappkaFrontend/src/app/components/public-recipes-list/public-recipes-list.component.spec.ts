import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicRecipesListComponent } from './public-recipes-list.component';

describe('PublicRecipesListComponent', () => {
  let component: PublicRecipesListComponent;
  let fixture: ComponentFixture<PublicRecipesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicRecipesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicRecipesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

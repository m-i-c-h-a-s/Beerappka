import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTopBarComponent } from './page-top-bar.component';

describe('PageTopBarComponent', () => {
  let component: PageTopBarComponent;
  let fixture: ComponentFixture<PageTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTopBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

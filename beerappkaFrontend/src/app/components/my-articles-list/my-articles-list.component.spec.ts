import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyArticlesListComponent } from './my-articles-list.component';

describe('MyArticlesListComponent', () => {
  let component: MyArticlesListComponent;
  let fixture: ComponentFixture<MyArticlesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyArticlesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyArticlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

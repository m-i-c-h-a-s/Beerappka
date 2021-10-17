import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBatchesListComponent } from './my-batches-list.component';

describe('MyBatchesListComponent', () => {
  let component: MyBatchesListComponent;
  let fixture: ComponentFixture<MyBatchesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBatchesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBatchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

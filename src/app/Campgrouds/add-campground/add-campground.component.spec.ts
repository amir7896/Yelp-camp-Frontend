import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampgroundComponent } from './add-campground.component';

describe('AddCampgroundComponent', () => {
  let component: AddCampgroundComponent;
  let fixture: ComponentFixture<AddCampgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCampgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

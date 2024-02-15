import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversRequestsDetailsComponent } from './drivers-requests-details.component';

describe('DriversRequestsDetailsComponent', () => {
  let component: DriversRequestsDetailsComponent;
  let fixture: ComponentFixture<DriversRequestsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversRequestsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversRequestsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

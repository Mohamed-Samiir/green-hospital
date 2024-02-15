import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayTripsDetailsModalComponent } from './today-trips-details-modal.component';

describe('TodayTripsDetailsModalComponent', () => {
  let component: TodayTripsDetailsModalComponent;
  let fixture: ComponentFixture<TodayTripsDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayTripsDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayTripsDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

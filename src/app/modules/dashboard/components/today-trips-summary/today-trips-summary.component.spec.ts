import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayTripsSummaryComponent } from './today-trips-summary.component';

describe('TodayTripsSummaryComponent', () => {
  let component: TodayTripsSummaryComponent;
  let fixture: ComponentFixture<TodayTripsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayTripsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayTripsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

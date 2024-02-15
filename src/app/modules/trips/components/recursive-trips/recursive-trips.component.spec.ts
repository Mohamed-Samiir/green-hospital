import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveTripsComponent } from './recursive-trips.component';

describe('RecursiveTripsComponent', () => {
  let component: RecursiveTripsComponent;
  let fixture: ComponentFixture<RecursiveTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursiveTripsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursiveTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

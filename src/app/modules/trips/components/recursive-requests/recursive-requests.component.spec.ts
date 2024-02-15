import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveRequestsComponent } from './recursive-requests.component';

describe('RecursiveRequestsComponent', () => {
  let component: RecursiveRequestsComponent;
  let fixture: ComponentFixture<RecursiveRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursiveRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursiveRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

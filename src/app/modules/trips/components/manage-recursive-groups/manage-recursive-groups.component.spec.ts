import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRecursiveGroupsComponent } from './manage-recursive-groups.component';

describe('ManageRecursiveGroupsComponent', () => {
  let component: ManageRecursiveGroupsComponent;
  let fixture: ComponentFixture<ManageRecursiveGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRecursiveGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRecursiveGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertGroupComponent } from './alert-group.component';

describe('AlertGroupComponent', () => {
  let component: AlertGroupComponent;
  let fixture: ComponentFixture<AlertGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

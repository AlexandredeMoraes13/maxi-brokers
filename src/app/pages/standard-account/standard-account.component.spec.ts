import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardAccountComponent } from './standard-account.component';

describe('StandardAccountComponent', () => {
  let component: StandardAccountComponent;
  let fixture: ComponentFixture<StandardAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

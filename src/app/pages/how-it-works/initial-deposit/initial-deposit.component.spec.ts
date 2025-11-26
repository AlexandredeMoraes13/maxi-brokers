import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialDepositComponent } from './initial-deposit.component';

describe('InitialDepositComponent', () => {
  let component: InitialDepositComponent;
  let fixture: ComponentFixture<InitialDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

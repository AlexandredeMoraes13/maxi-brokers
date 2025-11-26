import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumAccountComponent } from './premium-account.component';

describe('PremiumAccountComponent', () => {
  let component: PremiumAccountComponent;
  let fixture: ComponentFixture<PremiumAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

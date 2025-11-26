import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipAccountComponent } from './vip-account.component';

describe('VipAccountComponent', () => {
  let component: VipAccountComponent;
  let fixture: ComponentFixture<VipAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VipAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VipAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

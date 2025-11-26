import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Painel07Component } from './painel07.component';

describe('Painel07Component', () => {
  let component: Painel07Component;
  let fixture: ComponentFixture<Painel07Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Painel07Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Painel07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

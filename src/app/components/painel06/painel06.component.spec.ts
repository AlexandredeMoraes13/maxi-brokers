import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Painel06Component } from './painel06.component';

describe('Painel06Component', () => {
  let component: Painel06Component;
  let fixture: ComponentFixture<Painel06Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Painel06Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Painel06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

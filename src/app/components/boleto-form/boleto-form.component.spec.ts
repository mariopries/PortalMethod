import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletoFormComponent } from './boleto-form.component';

describe('BoletoFormComponent', () => {
  let component: BoletoFormComponent;
  let fixture: ComponentFixture<BoletoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

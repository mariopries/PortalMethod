import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCheckoutComponent } from './produto-checkout.component';

describe('ProdutoCheckoutComponent', () => {
  let component: ProdutoCheckoutComponent;
  let fixture: ComponentFixture<ProdutoCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

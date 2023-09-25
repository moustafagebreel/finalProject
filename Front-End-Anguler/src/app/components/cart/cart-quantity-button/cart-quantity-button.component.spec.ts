import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartQuantityButtonComponent } from './cart-quantity-button.component';

describe('CartQuantityButtonComponent', () => {
  let component: CartQuantityButtonComponent;
  let fixture: ComponentFixture<CartQuantityButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartQuantityButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartQuantityButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

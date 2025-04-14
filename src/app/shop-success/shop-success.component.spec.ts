import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSuccessComponent } from './shop-success.component';

describe('ShopSuccessComponent', () => {
  let component: ShopSuccessComponent;
  let fixture: ComponentFixture<ShopSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

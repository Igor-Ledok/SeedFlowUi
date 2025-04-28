import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootShopTovarsComponent } from './root-shop-tovars.component';

describe('RootShopTovarsComponent', () => {
  let component: RootShopTovarsComponent;
  let fixture: ComponentFixture<RootShopTovarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootShopTovarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootShopTovarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingAccessComponent } from './marketing-access.component';

describe('MarketingAccessComponent', () => {
  let component: MarketingAccessComponent;
  let fixture: ComponentFixture<MarketingAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketingAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

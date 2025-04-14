import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalAndFinancialServicesComponent } from './legal-and-financial-services.component';

describe('LegalAndFinancialServicesComponent', () => {
  let component: LegalAndFinancialServicesComponent;
  let fixture: ComponentFixture<LegalAndFinancialServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalAndFinancialServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalAndFinancialServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

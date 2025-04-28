import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootAccountsComponent } from './root-accounts.component';

describe('RootAccountsComponent', () => {
  let component: RootAccountsComponent;
  let fixture: ComponentFixture<RootAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootAccountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

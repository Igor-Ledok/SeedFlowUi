import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecamingAuthorComponent } from './becaming-author.component';

describe('BecamingAuthorComponent', () => {
  let component: BecamingAuthorComponent;
  let fixture: ComponentFixture<BecamingAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BecamingAuthorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecamingAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutCommentDonationAccessComponent } from './without-comment-donation-access.component';

describe('WithoutCommentDonationAccessComponent', () => {
  let component: WithoutCommentDonationAccessComponent;
  let fixture: ComponentFixture<WithoutCommentDonationAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithoutCommentDonationAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithoutCommentDonationAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

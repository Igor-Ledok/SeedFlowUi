import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDonationComponent } from './comment-donation.component';

describe('CommentDonationComponent', () => {
  let component: CommentDonationComponent;
  let fixture: ComponentFixture<CommentDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentDonationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

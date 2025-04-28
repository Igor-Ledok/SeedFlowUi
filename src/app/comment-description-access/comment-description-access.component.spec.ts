import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDescriptionAccessComponent } from './comment-description-access.component';

describe('CommentDescriptionAccessComponent', () => {
  let component: CommentDescriptionAccessComponent;
  let fixture: ComponentFixture<CommentDescriptionAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentDescriptionAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentDescriptionAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

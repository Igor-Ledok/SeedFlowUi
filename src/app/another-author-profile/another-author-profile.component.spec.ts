import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherAuthorProfileComponent } from './another-author-profile.component';

describe('AnotherAuthorProfileComponent', () => {
  let component: AnotherAuthorProfileComponent;
  let fixture: ComponentFixture<AnotherAuthorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnotherAuthorProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnotherAuthorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

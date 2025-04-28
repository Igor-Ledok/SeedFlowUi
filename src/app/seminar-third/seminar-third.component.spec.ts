import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarThirdComponent } from './seminar-third.component';

describe('SeminarThirdComponent', () => {
  let component: SeminarThirdComponent;
  let fixture: ComponentFixture<SeminarThirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeminarThirdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeminarThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarSecondComponent } from './seminar-second.component';

describe('SeminarSecondComponent', () => {
  let component: SeminarSecondComponent;
  let fixture: ComponentFixture<SeminarSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeminarSecondComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeminarSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

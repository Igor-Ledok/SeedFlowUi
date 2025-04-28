import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarsVebinarsComponent } from './seminars-vebinars.component';

describe('SeminarsVebinarsComponent', () => {
  let component: SeminarsVebinarsComponent;
  let fixture: ComponentFixture<SeminarsVebinarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeminarsVebinarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeminarsVebinarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

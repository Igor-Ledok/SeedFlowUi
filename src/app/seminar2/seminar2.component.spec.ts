import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seminar2Component } from './seminar2.component';

describe('Seminar2Component', () => {
  let component: Seminar2Component;
  let fixture: ComponentFixture<Seminar2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seminar2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seminar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

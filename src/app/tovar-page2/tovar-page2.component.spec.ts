import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TovarPage2Component } from './tovar-page2.component';

describe('TovarPage2Component', () => {
  let component: TovarPage2Component;
  let fixture: ComponentFixture<TovarPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TovarPage2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TovarPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

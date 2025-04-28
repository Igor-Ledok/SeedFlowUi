import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TovarPageComponent } from './tovar-page.component';

describe('TovarPageComponent', () => {
  let component: TovarPageComponent;
  let fixture: ComponentFixture<TovarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TovarPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TovarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

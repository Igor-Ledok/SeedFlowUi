import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPassAccessComponent } from './new-pass-access.component';

describe('NewPassAccessComponent', () => {
  let component: NewPassAccessComponent;
  let fixture: ComponentFixture<NewPassAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPassAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPassAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

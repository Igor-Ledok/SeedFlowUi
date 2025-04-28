import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsAccessComponent } from './uploads-access.component';

describe('UploadsAccessComponent', () => {
  let component: UploadsAccessComponent;
  let fixture: ComponentFixture<UploadsAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadsAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadsAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

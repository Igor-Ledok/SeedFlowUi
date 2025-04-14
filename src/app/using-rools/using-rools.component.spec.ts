import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsingRoolsComponent } from './using-rools.component';

describe('UsingRoolsComponent', () => {
  let component: UsingRoolsComponent;
  let fixture: ComponentFixture<UsingRoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsingRoolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsingRoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

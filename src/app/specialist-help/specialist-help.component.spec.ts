import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistHelpComponent } from './specialist-help.component';

describe('SpecialistHelpComponent', () => {
  let component: SpecialistHelpComponent;
  let fixture: ComponentFixture<SpecialistHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialistHelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialistHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

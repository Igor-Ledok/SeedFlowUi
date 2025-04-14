import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeProjectPageComponent } from './see-project-page.component';

describe('SeeProjectPageComponent', () => {
  let component: SeeProjectPageComponent;
  let fixture: ComponentFixture<SeeProjectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeProjectPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

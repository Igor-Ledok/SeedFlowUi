import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxProjectsComponent } from './max-projects.component';

describe('MaxProjectsComponent', () => {
  let component: MaxProjectsComponent;
  let fixture: ComponentFixture<MaxProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaxProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

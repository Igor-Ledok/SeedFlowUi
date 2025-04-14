import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateStartUpComponent } from './state-start-up.component';

describe('StateStartUpComponent', () => {
  let component: StateStartUpComponent;
  let fixture: ComponentFixture<StateStartUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateStartUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateStartUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

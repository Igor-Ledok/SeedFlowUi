import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndTovarPageComponent } from './end-tovar-page.component';

describe('EndTovarPageComponent', () => {
  let component: EndTovarPageComponent;
  let fixture: ComponentFixture<EndTovarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndTovarPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndTovarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

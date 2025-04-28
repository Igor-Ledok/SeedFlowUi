import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegAccessComponent } from './reg-access.component';

describe('RegAccessComponent', () => {
  let component: RegAccessComponent;
  let fixture: ComponentFixture<RegAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayedAchievementsComponent } from './displayed-achievements.component';

describe('DisplayedAchievementsComponent', () => {
  let component: DisplayedAchievementsComponent;
  let fixture: ComponentFixture<DisplayedAchievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayedAchievementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayedAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

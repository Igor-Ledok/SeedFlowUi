import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReachAchievementComponent } from './reach-achievement.component';

describe('ReachAchievementComponent', () => {
  let component: ReachAchievementComponent;
  let fixture: ComponentFixture<ReachAchievementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReachAchievementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReachAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

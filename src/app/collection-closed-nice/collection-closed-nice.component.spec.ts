import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionClosedNiceComponent } from './collection-closed-nice.component';

describe('CollectionClosedNiceComponent', () => {
  let component: CollectionClosedNiceComponent;
  let fixture: ComponentFixture<CollectionClosedNiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionClosedNiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionClosedNiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

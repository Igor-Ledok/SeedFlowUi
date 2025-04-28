import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadCollectionClosedComponent } from './bad-collection-closed.component';

describe('BadCollectionClosedComponent', () => {
  let component: BadCollectionClosedComponent;
  let fixture: ComponentFixture<BadCollectionClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadCollectionClosedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadCollectionClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

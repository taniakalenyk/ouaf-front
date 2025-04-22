import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogRewardsComponent } from './dog-rewards.component';

describe('DogRewardsComponent', () => {
  let component: DogRewardsComponent;
  let fixture: ComponentFixture<DogRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogRewardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

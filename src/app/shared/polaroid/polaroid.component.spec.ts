import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolaroidComponent } from './polaroid.component';

describe('PolaroidComponent', () => {
  let component: PolaroidComponent;
  let fixture: ComponentFixture<PolaroidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolaroidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolaroidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinesComponent } from './vaccines.component';

describe('VaccinesComponent', () => {
  let component: VaccinesComponent;
  let fixture: ComponentFixture<VaccinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

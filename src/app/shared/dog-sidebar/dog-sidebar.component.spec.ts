import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogSidebarComponent } from './dog-sidebar.component';

describe('DogSidebarComponent', () => {
  let component: DogSidebarComponent;
  let fixture: ComponentFixture<DogSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

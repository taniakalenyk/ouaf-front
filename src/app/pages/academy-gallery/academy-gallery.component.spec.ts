import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyGalleryComponent } from './academy-gallery.component';

describe('AcademyGalleryComponent', () => {
  let component: AcademyGalleryComponent;
  let fixture: ComponentFixture<AcademyGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademyGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademyGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
